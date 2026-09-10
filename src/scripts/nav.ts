/**
 * Nav behaviour: solid background after a little scroll, hide on scroll-down,
 * show on scroll-up, and an IntersectionObserver scrollspy. No GSAP here so it
 * works identically under reduced motion.
 */
export function initNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  let last = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 40);
      nav.classList.toggle('is-hidden', y > last + 2 && y > 200);
      last = y;
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Show the nav again when keyboard focus lands inside it.
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));

  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[data-spy]'));
  const sections = links
    .map((a) => document.getElementById(a.dataset.spy ?? ''))
    .filter((el): el is HTMLElement => !!el);
  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        for (const a of links) {
          if (a.dataset.spy === id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        }
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  sections.forEach((s) => io.observe(s));
}
