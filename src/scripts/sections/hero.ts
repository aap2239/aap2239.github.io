import gsap from 'gsap';

interface Opts {
  desktop: boolean;
  fine: boolean;
}

/** Hero intro (line masks), parallax exit on scroll, and a pointer-following glow on fine pointers. */
export function initHero({ desktop, fine }: Opts): () => void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return () => {};

  const lines = hero.querySelectorAll<HTMLElement>('.mask-line > span');
  const fades = hero.querySelectorAll<HTMLElement>('[data-intro]');

  // The CSS pre-hide uses translateY(110%), which GSAP reads back as a pixel `y`.
  // Zero it explicitly so the yPercent tween lands the text where it belongs.
  gsap.set(lines, { y: 0, yPercent: 110 });
  gsap.set(fades, { y: 16 });

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  tl.to(lines, {
    yPercent: 0,
    duration: 1.2,
    stagger: 0.1,
    onComplete: () => gsap.set(lines, { clearProps: 'willChange' }),
  }).to(fades, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, '-=0.8');

  // Start once fonts are in (they are preloaded, so this is quick), but never wait more than 400 ms.
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 400))]).then(() => tl.play());

  if (desktop) {
    gsap.to(hero, {
      yPercent: -10,
      autoAlpha: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: hero.closest('section') ?? hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  let onMove: ((e: PointerEvent) => void) | null = null;
  const glow = document.querySelector<HTMLElement>('[data-glow]');
  if (fine && glow) {
    const xTo = gsap.quickTo(glow, 'x', { duration: 1.4, ease: 'power3' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 1.4, ease: 'power3' });
    onMove = (e) => {
      xTo((e.clientX / window.innerWidth - 0.5) * 160);
      yTo((e.clientY / window.innerHeight - 0.5) * 160);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
  }

  return () => {
    if (onMove) window.removeEventListener('pointermove', onMove);
  };
}
