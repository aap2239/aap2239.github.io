import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

/** Fill the vertical rule on scroll; on desktop keep the sticky column in sync with the card in view. */
export function initExperience({ desktop }: Opts): void {
  const root = document.querySelector<HTMLElement>('[data-xp]');
  if (!root) return;

  const fill = root.querySelector<HTMLElement>('[data-xp-fill]');
  if (fill) {
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: { trigger: root, start: 'top 60%', end: 'bottom 60%', scrub: true },
      },
    );
  }

  if (!desktop) return;

  const cards = gsap.utils.toArray<HTMLElement>('[data-xp-card]', root);
  const metas = gsap.utils.toArray<HTMLElement>('[data-xp-meta]', root);
  if (cards.length === 0 || metas.length === 0) return;

  const setActive = (index: number) =>
    metas.forEach((m, j) => {
      if (index === j) m.setAttribute('data-active', '');
      else m.removeAttribute('data-active');
    });

  cards.forEach((card, i) =>
    ScrollTrigger.create({
      trigger: card,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => self.isActive && setActive(i),
    }),
  );
  setActive(0);
}
