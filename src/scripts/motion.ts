/**
 * Motion entry point. Registers GSAP plugins once, then sets up every
 * animation inside a gsap.matchMedia() context so tweens and ScrollTriggers
 * are reverted and rebuilt automatically when the viewport crosses a
 * breakpoint or the OS toggles reduced motion.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { createLenis } from './lenis';
import { initNav } from './nav';
import { initTicker } from './ticker';
import { initReveal } from './reveal';
import { initHero } from './sections/hero';
import { initJourney } from './sections/journey';
import { initExperience } from './sections/experience';
import { initCounters } from './sections/counters';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export type Cleanup = (() => void) | void;

export function boot(): void {
  // Things that are not motion and should work everywhere, including reduced motion.
  initNav();
  initTicker();

  ScrollTrigger.config({ ignoreMobileResize: true });

  const mm = gsap.matchMedia();
  mm.add(
    {
      reduce: '(prefers-reduced-motion: reduce)',
      desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
    },
    (ctx) => {
      const c = ctx.conditions as { reduce: boolean; desktop: boolean };
      if (c.reduce) return; // CSS renders the static state; nothing to do.

      const lenis = c.desktop ? createLenis() : null;
      const cleanups: Cleanup[] = [initHero({ desktop: c.desktop })];

      // Everything below the fold is set up in a second task so the first
      // interaction is never blocked by ScrollTrigger measuring the page.
      // ctx.add() keeps the tweens inside this matchMedia context for reverting.
      const later = () =>
        ctx.add(() => {
          cleanups.push(
            initReveal(),
            initJourney({ desktop: c.desktop }),
            initExperience({ desktop: c.desktop }),
            initCounters(),
          );
        });
      const hasIdle = typeof window.requestIdleCallback === 'function';
      const idle = hasIdle ? window.requestIdleCallback(later, { timeout: 300 }) : setTimeout(later, 40);

      return () => {
        if (hasIdle) window.cancelIdleCallback(idle as number);
        else clearTimeout(idle);
        cleanups.forEach((fn) => fn && fn());
        lenis?.destroy();
      };
    },
  );

  // Fonts change line wrapping, which changes every trigger position.
  // (ScrollTrigger already refreshes itself on window load.)
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}
