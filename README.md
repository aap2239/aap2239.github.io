# aap2239.github.io

Personal site for Aishwarya Patange. Astro 7, GSAP ScrollTrigger, Lenis. Static output, deployed to GitHub Pages by GitHub Actions.

## Run it locally

Node is installed through fnm, which is not on the PATH in a fresh shell. In PowerShell:

```powershell
fnm env --use-on-cd --shell power-shell | Out-String | Invoke-Expression
fnm use 24
npm install
npm run dev        # http://localhost:4321
```

Other scripts:

```powershell
npm run build      # type-check (astro check) + production build into dist/
npm run preview    # serve dist/ locally
```

Tip: put the two fnm lines in your PowerShell `$PROFILE` once and you will not need them again.

This folder lives inside OneDrive. `node_modules` is in `.gitignore`, but OneDrive still tries to sync it, which slows installs. If it becomes annoying, either add the folder to Windows Defender exclusions and OneDrive's "always keep on this device" list, or move the repo to a non-synced path such as `C:\dev\aap2239.github.io`.

## Editing content

All copy lives in `src/data/`. You should never need to touch a component to change what the site says.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, role, hero headline lines, about paragraphs and stats, contact copy, social links, nav items |
| `experience.ts` | Work history (newest first). Entries with `todo: true` render with a dashed outline. |
| `projects.ts` | Featured case studies (`featured: true`) and the open-source grid. Only repos with `showcase: true` are shown; the rest are kept in the file for easy swapping. |
| `skills.ts` | The four pipeline stages. Add `usedIn` to a skill to give it the amber dot. |
| `education.ts` | Degrees |
| `journey.ts` | The four map stops. `x`/`y` are positions inside a 1200 x 520 canvas. |
| `now.ts` | The "Now" list and its "Updated" stamp |
| `hobbies.ts` | Ticker words and the hobby tiles |

### Things still marked TODO

1. **Gartner role** in `src/data/experience.ts`: confirm the title, write 3 to 5 bullets with numbers, fill `metrics` and `tags`, then remove `todo: true`.
2. **Gartner line** in `src/data/journey.ts`: one sentence, then remove `todo: true`.
3. **"Building"** in `src/data/now.ts`: one line, then remove `todo: true`.
4. **Resume**: replace `public/resume.pdf` with the real PDF (same filename).
5. Optional: replace `src/assets/headshot.jpg` with a newer photo. Any size works; Astro generates the AVIF and WebP variants.

Search the repo for `TODO` to find every placeholder.

## How the motion works

- `src/scripts/motion.ts` boots everything inside `gsap.matchMedia()`. Desktop (768px and up) gets Lenis smooth scroll and the pinned journey map. Mobile gets native scroll and a vertical timeline. `prefers-reduced-motion: reduce` disables all of it and the page renders fully static.
- Reveals are driven by attributes: `data-reveal`, `data-reveal="clip"`, `data-reveal="lines"`, and `data-reveal-group` (staggers children). CSS pre-hides those only when JavaScript is running and motion is allowed, so nothing is hidden without JS.
- Only `transform`, `opacity`, `clip-path`, and `stroke-dashoffset` are animated. There is one pinned section (the map).

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

First-time setup on the `aap2239/aap2239.github.io` repository:

1. Settings, Pages, "Build and deployment", set Source to **GitHub Actions**.
2. Locally: `git remote add origin https://github.com/aap2239/aap2239.github.io.git` then `git push -u origin main`.
3. Settings, General, set the default branch to `main`.
4. Once the new site is live, delete the old `master` branch. The old React source is still in the `portfolio-react` repository.

## Checks before shipping

- `npm run build` passes with no errors.
- Lighthouse (Chrome DevTools, mobile, incognito): Performance 95+, Accessibility 100, Best Practices 100, SEO 100.
- DevTools "Emulate CSS prefers-reduced-motion: reduce": every section visible, nothing moves.
- Keyboard only: Tab from the skip link through every card and button, focus ring always visible.
- 360px wide: no horizontal scrolling.
