/** Pause the CSS ticker while it is off-screen so it costs nothing. */
export function initTicker(): void {
  const ticker = document.querySelector<HTMLElement>('[data-ticker]');
  if (!ticker || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    ([entry]) => ticker.classList.toggle('is-paused', !entry.isIntersecting),
    { threshold: 0 },
  );
  io.observe(ticker);
}
