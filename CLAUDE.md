# aap2239.github.io

Personal site for Aishwarya Patange. Astro 7 (static), GSAP ScrollTrigger, Lenis smooth scroll. No UI framework, no component library, no Tailwind — plain `.astro` files with scoped `<style>` blocks and a small token file.

Content lives in `src/data/*.ts`. Components never hard-code copy.

## Running it

Node comes from fnm, not the system PATH:

```
fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression; fnm use 24
npm run dev     # astro dev runs as a daemon: `npx astro dev stop` / `status` / `logs`
npm run build   # astro check + astro build
```

Two traps, both of which look like site bugs and are not:

- **Never run `astro check` or `npm run build` while the dev server is live.** It re-optimizes the Vite dep cache underneath the running server; the browser then 504s on `gsap`/`lenis`, so nothing is ever revealed and the page goes blank over perfectly good HTML.
- **HMR silently misses edits** — this repo sits in a OneDrive folder where file watching is unreliable. If a change does not take effect, restart before you debug it: `npx astro dev stop; rm -rf node_modules/.vite; npm run dev`.

## Design rules

The point of this site is that it does not read as machine-made. Default LLM styling has a recognisable set of tics, and the whole list is banned here. These are not preferences to weigh against others — treat them as constraints.

**Do not use:**

- **Tags and pills.** No bordered chips for technologies, skills or categories. Write them as a sentence or a plain comma-separated line.
- **Italics for emphasis.** No accent-coloured `<em>` inside headings. If a heading needs a lift, rewrite the heading.
- **Instrument Serif.** The fonts are Archivo Black (display) and Archivo (body). Do not add a third.
- **Negative letter-spacing.** Tracking stays at 0 or positive. No `-0.03em` display tracking.
- **Over-detailed UI.** No badge-on-a-card-in-a-panel. One level of structure is enough.
- **Dividers as decoration.** Separate sections with space, not rules. A border has to earn its place.
- **Many shades and opacities.** One background, one foreground, one muted foreground, one accent. No `--bg-2`/`--bg-3`, no `rgb(… / 0.14)` tints.
- **Bordered containers.** Cards do not get outlines. Group with spacing and alignment.
- **Over-detailed diagrams.** The journey map is the one piece of data visualisation; it stays minimal.
- **Verbose, redundant text.** No label that restates the value beneath it. No sentence that repeats the heading.
- **Code breadcrumbs.** No `<code>src/data/foo.ts</code>` or file paths in user-facing copy.
- **Section numbering.** No `01` / `02` / `03` before headings.
- **Eyebrows.** No small label stacked above a heading. The heading does that work.
- **ASCII art.** Ever.
- **Squircles.** `border-radius` is 0 everywhere. Square corners are the house style.
- **Mono fonts as texture.** No monospace for labels, dates, metrics or nav. Mono is for code, and there is no code on this site.
- **ALL-CAPS subtitles.** Display headlines are uppercase by design; nothing else is. No `text-transform: uppercase` on labels, subtitles, buttons or nav.
- **Periods at the end of headings.** Headings do not take terminal punctuation. Sentences in body copy do.

**Instead:** lean on size, weight and whitespace. The palette is black, off-white and one red — the red is for genuine emphasis, not for decorating every third word.

## Conventions

- Scoped styles in the component. Only genuinely shared rules go in `src/styles/global.css`; tokens in `src/styles/tokens.css`.
- GSAP gotcha: a CSS pre-hide of `translateY(110%)` is read back as a pixel `y`, so tweens must set `y: 0` alongside `yPercent`.
- `html.js` pre-hides anything marked `[data-reveal]`, `[data-reveal-group]` or `[data-intro]`. If a reveal animation does not run, that content is invisible, not just unanimated.
- Prefer verifying a change in a real browser over trusting the markup.
