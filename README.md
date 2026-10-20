# Vedant Bhadri — Portfolio

Personal portfolio for AI, machine learning and software engineering work. Plain HTML/CSS/JS, no build step.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html       Home: hero, about + stats, expertise, experience, projects, contact
projects.html    Full project archive with filters + search
css/styles.css   Design tokens, graphite theme and all styles
js/data.js       Site links + project list (edit this to add work)
js/main.js       Rendering, card illustrations, filters, interactions
assets/          CV, coursework PDFs, favicon
```

## Adding a project

Append an object to `window.PROJECTS` in `js/data.js`:

- `featured: true` shows it in the home page's default "All" view (one wide `highlight` card, then rows of three)
- `category` / `tags` drive the filters: `AI/ML`, `Software`, `Research`, `Coursework`, `Vibe Coding`
- `visual` picks the generated illustration: `signal`, `network`, `route`, `grid`, `terminal`, `menu`, `kanban`, `arena`
- `links` accepts `github`, `report`, `demo`

## Portrait

The hero has a placeholder. Drop a cut-out (transparent background) PNG at `assets/img/portrait.png`
and replace the contents of `<figure class="portrait">` in `index.html` with:

```html
<img src="assets/img/portrait.png" alt="Portrait of Vedant Bhadri">
```

## Design notes

- Graphite theme (`<html data-theme="graphite">`): charcoal `#1c1c1e` base, grey surfaces, vivid orange hero/accent `#ff5a1f`, near-black bands for the tools strip, stats and contact
- Removing `data-theme="graphite"` falls back to the light palette defined in `:root`
- Type: Plus Jakarta Sans (display + UI), JetBrains Mono (small labels)
- Patterns: pill buttons with round arrow badge, numbered specialties, highlighted first expertise card, filterable project grid
