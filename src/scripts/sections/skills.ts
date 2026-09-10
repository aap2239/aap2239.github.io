import gsap from 'gsap';

interface Opts {
  desktop: boolean;
}

/** The pipeline connector fills left-to-right (desktop) or top-to-bottom (mobile) as the section scrolls. */
export function initSkills({ desktop }: Opts): void {
  const pipe = document.querySelector<HTMLElement>('[data-pipe]');
  const line = pipe?.querySelector<HTMLElement>('[data-pipe-line]');
  if (!pipe || !line) return;

  const axis = desktop ? 'scaleX' : 'scaleY';
  gsap.fromTo(
    line,
    { [axis]: 0 },
    {
      [axis]: 1,
      ease: 'none',
      transformOrigin: desktop ? 'left' : 'top',
      scrollTrigger: {
        trigger: pipe,
        start: desktop ? 'top 75%' : 'top 70%',
        end: desktop ? 'top 30%' : 'bottom 70%',
        scrub: true,
      },
    },
  );
}
