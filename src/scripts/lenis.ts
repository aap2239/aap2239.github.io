import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface LenisHandle {
  destroy(): void;
}

/**
 * Smooth scroll on desktop pointer devices only. Driven by GSAP's ticker so
 * ScrollTrigger and Lenis share one frame loop.
 */
export function createLenis(): LenisHandle {
  const lenis = new Lenis({
    lerp: 0.1,
    anchors: true,
    autoRaf: false,
  });
  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return {
    destroy() {
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}
