import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

interface CamKey {
  t: number;
  x: number;
  y: number;
  w: number;
}

/** Stroke widths and dash lengths in screen pixels; converted to map units per frame. */
const ROUTE_PX = 2.5;
const GHOST_PX = 1.5;
const GHOST_DASH_PX = [2, 7];

/**
 * Desktop: pin the stage and scrub one timeline that flies the map camera
 * (by animating the SVG viewBox) from city to city, draws each leg of the
 * route, moves the traveller along it, pops markers, crossfades captions, and
 * finally pulls back to the whole world.
 * Mobile: the map stays at world view; the caption list becomes a vertical
 * timeline whose line fills as you scroll.
 */
export function initJourney({ desktop }: Opts): () => void {
  const section = document.querySelector<HTMLElement>('#journey');
  if (!section) return () => {};
  const caps = gsap.utils.toArray<HTMLElement>('[data-cap]', section);
  const svg = section.querySelector<SVGSVGElement>('[data-map]');
  if (!svg) return () => {};

  const worldW = parseFloat(svg.dataset.worldW ?? '2000');
  const aspect = parseFloat(svg.dataset.aspect ?? '2');
  const stops = gsap.utils.toArray<SVGGElement>('[data-stop]', svg);
  const stopXY = stops.map((s) => ({ x: parseFloat(s.dataset.x ?? '0'), y: parseFloat(s.dataset.y ?? '0') }));
  const segs = gsap.utils.toArray<SVGPathElement>('[data-seg]', svg);
  const ghosts = gsap.utils.toArray<SVGPathElement>('.map__ghost', svg);
  const traveller = svg.querySelector<SVGGElement>('[data-traveller]');
  const travellerInner = svg.querySelector<SVGGElement>('[data-traveller-inner]');

  /** Pixel width of the rendered map; read at init and on refresh only. */
  let pxWidth = svg.clientWidth || 1;

  /** Markers and labels are authored in pixels; on a phone-width map they get a smaller footprint. */
  const markerFactor = desktop ? 1 : 0.6;

  /** Size everything that should keep a constant screen size for a given visible width (map units). */
  const applyScale = (visibleW: number) => {
    const u = visibleW / pxWidth; // map units per screen pixel
    const m = u * markerFactor;
    stops.forEach((stop, i) => stop.setAttribute('transform', `translate(${stopXY[i].x} ${stopXY[i].y}) scale(${m})`));
    if (travellerInner) travellerInner.setAttribute('transform', `scale(${u})`);
    // Inline styles so they win over the stylesheet defaults.
    const routeW = `${ROUTE_PX * u}px`;
    const ghostW = `${GHOST_PX * u}px`;
    const dash = `${GHOST_DASH_PX[0] * u}px ${GHOST_DASH_PX[1] * u}px`;
    segs.forEach((p) => (p.style.strokeWidth = routeW));
    ghosts.forEach((p) => {
      p.style.strokeWidth = ghostW;
        p.style.strokeDasharray = dash;
    });
  };

  // ---------- Mobile: static world view ----------
  if (!desktop) {
    const worldViewW = worldW;
    stops.forEach((stop, i) => {
      const label = stop.querySelector('[data-label]');
      if (label && (i === 1 || i === 3)) gsap.set(label, { autoAlpha: 0 });
    });
    if (traveller) gsap.set(traveller, { autoAlpha: 0 });
    applyScale(worldViewW);
    const onResize = () => {
      pxWidth = svg.clientWidth || 1;
      applyScale(worldViewW);
    };
    window.addEventListener('resize', onResize, { passive: true });

    const line = section.querySelector<HTMLElement>('[data-journey-line]');
    const list = section.querySelector<HTMLElement>('[data-journey-captions]');
    if (line && list) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 70%', scrub: true },
        },
      );
    }
    gsap.set(caps, { y: 20 });
    ScrollTrigger.batch(caps, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }),
    });
    return () => window.removeEventListener('resize', onResize);
  }

  // ---------- Desktop: pinned fly-through ----------
  const stage = section.querySelector<HTMLElement>('[data-journey-stage]');
  const keys: CamKey[] = JSON.parse(svg.dataset.camera ?? '[]');
  if (!stage || !traveller || segs.length === 0 || caps.length === 0 || keys.length < 2) return () => {};

  const cam = { x: keys[0].x, y: keys[0].y, w: keys[0].w };
  const pops = stops.map((s) => s.querySelector<SVGGElement>('[data-pop]'));
  const labels = stops.map((s) => s.querySelector<SVGGElement>('[data-label]'));

  const applyCamera = () => {
    const h = cam.w / aspect;
    svg.setAttribute('viewBox', `${cam.x - cam.w / 2} ${cam.y - h / 2} ${cam.w} ${h}`);
    applyScale(cam.w);
  };

  // Initial state.
  pops.forEach((p) => p && gsap.set(p, { scale: 0, transformOrigin: '50% 50%' }));
  labels.forEach((l) => l && gsap.set(l, { opacity: 0 }));
  // Dash slightly longer than the path so the round line cap never peeks out at the far end before drawing starts.
  const segLens = segs.map((seg) => seg.getTotalLength() + 8);
  segs.forEach((seg, i) => gsap.set(seg, { strokeDasharray: segLens[i], strokeDashoffset: segLens[i] }));
  gsap.set(caps, { opacity: 0, y: 16 });
  gsap.set(caps[0], { opacity: 1, y: 0 });
  applyCamera();

  const end = keys[keys.length - 1].t;
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    onUpdate: applyCamera,
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: '+=380%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: () => {
        pxWidth = svg.clientWidth || 1;
        applyCamera();
      },
    },
  });

  // Camera legs.
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    const prev = keys[i - 1];
    tl.to(cam, { x: k.x, y: k.y, w: k.w, duration: k.t - prev.t, ease: 'power1.inOut' }, prev.t);
  }

  // Route legs and traveller: one time unit per leg.
  segs.forEach((seg, i) => {
    tl.to(seg, { strokeDashoffset: 0, duration: 1 }, i);
    tl.to(traveller, { duration: 1, motionPath: { path: seg, align: seg, alignOrigin: [0.5, 0.5] } }, i);
  });

  // Markers and labels pop as the traveller arrives.
  stops.forEach((_, i) => {
    const at = Math.min(i, segs.length - 0.3);
    if (pops[i]) tl.to(pops[i], { scale: 1, duration: 0.3, ease: 'back.out(2)' }, at);
    if (labels[i]) tl.to(labels[i], { opacity: 1, duration: 0.3 }, at + 0.05);
  });

  // Captions crossfade at each stop.
  caps.forEach((cap, i) => {
    if (i === 0) return;
    tl.to(caps[i - 1], { opacity: 0, y: -12, duration: 0.25, ease: 'power2.in' }, i - 0.35)
      .to(cap, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, i - 0.1);
  });

  // Pull back to the world: hide the traveller and the labels that would collide at that zoom.
  const worldAt = end - 1;
  tl.to(traveller, { opacity: 0, duration: 0.3 }, worldAt + 0.2);
  [1, 3].forEach((i) => labels[i] && tl.to(labels[i], { opacity: 0, duration: 0.3 }, worldAt + 0.2));

  // Hold at the end so the world view gets a beat before the section unpins.
  tl.to({}, { duration: 0.5 }, end);

  return () => {};
}
