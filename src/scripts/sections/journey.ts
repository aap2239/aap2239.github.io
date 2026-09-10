import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

/**
 * Desktop: pin the stage and scrub one timeline that draws the route, moves the
 * traveller along it, pops each marker, and crossfades the caption cards.
 * Mobile: a vertical timeline whose line fills as you scroll and whose cards reveal.
 */
export function initJourney({ desktop }: Opts): void {
  const section = document.querySelector<HTMLElement>('#journey');
  if (!section) return;
  const caps = gsap.utils.toArray<HTMLElement>('[data-cap]', section);
  if (caps.length === 0) return;

  if (!desktop) {
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
    return;
  }

  const stage = section.querySelector<HTMLElement>('[data-journey-stage]');
  const svg = section.querySelector<SVGSVGElement>('[data-map]');
  const route = svg?.querySelector<SVGPathElement>('[data-route]');
  const traveller = svg?.querySelector<SVGGElement>('[data-traveller]');
  const stops = svg ? gsap.utils.toArray<SVGGElement>('[data-stop]', svg) : [];
  if (!stage || !svg || !route || !traveller) return;

  const len = route.getTotalLength();
  const segs = Math.max(1, caps.length - 1);

  gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
  stops.forEach((stop) => {
    gsap.set(stop.querySelectorAll('[data-marker]'), { scale: 0 });
    gsap.set(stop.querySelectorAll('text'), { opacity: 0 });
  });
  gsap.set(caps, { opacity: 0, y: 16 });
  gsap.set(caps[0], { opacity: 1, y: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: stage,
      start: 'top top',
      end: '+=280%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(route, { strokeDashoffset: 0, duration: segs }, 0);
  tl.to(
    traveller,
    {
      duration: segs,
      motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5] },
    },
    0,
  );

  stops.forEach((stop, i) => {
    const at = Math.min(i, segs - 0.3);
    tl.to(
      stop.querySelectorAll('[data-marker]'),
      { scale: 1, duration: 0.3, ease: 'back.out(2)', stagger: 0.05 },
      at,
    ).to(stop.querySelectorAll('text'), { opacity: 1, duration: 0.3 }, at + 0.05);
  });

  caps.forEach((cap, i) => {
    if (i === 0) return;
    tl.to(caps[i - 1], { opacity: 0, y: -12, duration: 0.25, ease: 'power2.in' }, i - 0.35)
      .to(cap, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, i - 0.1);
  });

  // Hold at the end so the last stop gets a beat before the section unpins.
  tl.to({}, { duration: 0.4 });
}
