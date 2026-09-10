import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Generic scroll reveals.
 *  - [data-reveal]            single element, fade + rise
 *  - [data-reveal="clip"]     single element, wipe up (used for the portrait)
 *  - [data-reveal="lines"]    container whose .mask-line > span children slide up
 *  - [data-reveal-group] > *  children staggered together
 *
 * CSS pre-hides these (opacity: 0) only when JS is on and motion is allowed,
 * so nothing is ever hidden for no-JS or reduced-motion readers.
 */
export function initReveal(): () => void {
  const singles = gsap.utils.toArray<HTMLElement>(
    '[data-reveal]:not([data-reveal="clip"]):not([data-reveal="lines"])',
  );
  const clips = gsap.utils.toArray<HTMLElement>('[data-reveal="clip"]');
  const lineBlocks = gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]');
  const groupChildren = gsap.utils
    .toArray<HTMLElement>('[data-reveal-group]')
    .flatMap((g) => Array.from(g.children) as HTMLElement[]);

  const risers = [...singles, ...groupChildren];
  gsap.set(risers, { y: 24 });

  ScrollTrigger.batch(risers, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: true,
        clearProps: 'transform',
      }),
  });

  clips.forEach((el) => {
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)' });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () =>
        gsap.to(el, {
          autoAlpha: 1,
          clipPath: 'inset(0% 0 0% 0)',
          duration: 1.1,
          ease: 'power4.inOut',
          clearProps: 'clipPath',
        }),
    });
  });

  lineBlocks.forEach((block) => {
    const spans = block.querySelectorAll<HTMLElement>('.mask-line > span');
    // The block itself is caught by the generic [data-reveal] pre-hide; the masks do the hiding here.
    gsap.set(block, { autoAlpha: 1 });
    gsap.set(spans, { y: 0, yPercent: 110 }); // y: 0 clears the pixel offset GSAP reads from the CSS pre-hide
    ScrollTrigger.create({
      trigger: block,
      start: 'top 85%',
      once: true,
      onEnter: () =>
        gsap.to(spans, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1 }),
    });
  });

  // Safety net: anything already scrolled past on load (deep links) is shown at once.
  const raf = requestAnimationFrame(() => {
    const passed = risers.filter((el) => el.getBoundingClientRect().bottom < 0);
    if (passed.length) gsap.set(passed, { autoAlpha: 1, clearProps: 'transform' });
  });

  return () => cancelAnimationFrame(raf);
}
