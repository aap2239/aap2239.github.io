import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Opts {
  desktop: boolean;
}

/** On desktop, keep the sticky year column in sync with the card in view. */
export function initExperience({ desktop }: Opts): void {
  const root = document.querySelector<HTMLElement>('[data-xp]');
  if (!root) return;

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

  initYear(root, cards);
}

/**
 * The big year counts backwards as you scroll: it starts at the present year
 * rendered into the markup, then scrubs down to each role's start year as that
 * role's card comes up, and holds there while the card is being read.
 */
function initYear(root: HTMLElement, cards: HTMLElement[]): void {
  const el = root.querySelector<HTMLElement>('[data-xp-year]');
  if (!el) return;

  const from = Number(el.textContent?.trim());
  if (!Number.isFinite(from)) return;

  // [present, ...each card's year] — leg i scrubs anchors[i] down to anchors[i + 1].
  const anchors = [from, ...cards.map((c) => Number(c.dataset.xpYear))];
  if (anchors.some((y) => !Number.isFinite(y))) return;

  const state = { year: from };
  let shown = from;
  const render = () => {
    const next = Math.round(state.year);
    if (next === shown) return; // avoid touching the DOM on every scroll frame
    shown = next;
    el.textContent = String(next);
  };

  cards.forEach((card, i) => {
    // fromTo, not to: the legs share one `state`, so each needs its own explicit
    // start year. A plain .to() would record 'whatever state holds right now' as
    // the start for every leg and send them all back to the present year.
    gsap.fromTo(
      state,
      { year: anchors[i] },
      {
        year: anchors[i + 1],
        ease: 'none',
        onUpdate: render,
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          // Anchored to the card's centre, not its top edge: the present year
          // holds while the card scrolls up into view, and only starts counting
          // down once you are actually reading it.
          start: 'center 70%',
          end: 'center 30%',
          scrub: 0.4,
        },
      },
    );
  });
}
