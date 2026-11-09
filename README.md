# T.I.P. Sustainable Development Goals

The Technological Institute of the Philippines' public site for its commitment to the 17 UN Sustainable Development Goals and the evidence behind them.

Visitors choose an SDG, then an indicator, and the evidence document opens in an embedded viewer. **Open in New Tab** opens the file in Google Drive, where they can read or download it.

## Run locally

Needs Node.js 22.18 or newer.

```bash
npm ci
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Update the content

All content is in [`data/sdg-data.ts`](data/sdg-data.ts). See the [content guide](SDG_PAGES_GUIDE.md) for how to add or change an indicator.

Before committing:

```bash
npm run check:data    # validates structure and IDs
npm run check:links   # also confirms an anonymous visitor can open every Drive link
npm run build
```

## Hosting

The site is a static export hosted as a [Render static site](https://render.com/docs/static-sites). [`render.yaml`](render.yaml) holds the settings, and Render rebuilds and publishes the site on every push to `main`. The build fails, leaving the live site unchanged, if `npm run check:data` finds a problem.

First-time setup: in the Render Dashboard, choose **New > Blueprint**, connect this repository, and apply.

GitHub Pages also works as a fallback. Set **Settings > Pages > Source** to **GitHub Actions**, then run the **Deploy to GitHub Pages** workflow manually.
