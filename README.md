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

The site is a static export hosted free on GitHub Pages at <https://fcarabuena.github.io/SDGs-TIP/>.

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which validates the data, builds the site, and publishes it.

First-time setup: in the repository's **Settings > Pages**, set **Source** to **GitHub Actions**.

If the repository is renamed or moved, the workflow picks up the new name automatically.
