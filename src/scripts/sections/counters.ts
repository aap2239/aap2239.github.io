import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Count-up for every [data-count]. The final value is already in the markup,
 * so without JS the number is simply there. Honors decimals (0.79, 93.51).
 */
export function initCounters(): void {
  const els = gsap.utils.toArray<HTMLElement>('[data-count]');
  els.forEach((el) => {
    const target = parseFloat(el.dataset.count ?? '');
    if (Number.isNaN(target)) return;
    const decimals = parseInt(el.dataset.decimals ?? '0', 10);
    const format = (v: number) =>
      v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const state = { v: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        el.textContent = format(0);
        gsap.to(state, {
          v: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = format(state.v);
          },
          onComplete: () => {
            el.textContent = format(target);
          },
        });
      },
    });
  });
}
