# SDG Content Guide

## Pages

| Route | Example | Shows |
|---|---|---|
| `/` | | Institutional commitment and a grid of all 17 SDGs |
| `/sdg/[number]` | `/sdg/6` | The commitment statement, targets, and indicators |
| `/sdg/[number]/[indicator id]` | `/sdg/6/sdg-6-1-3` | The evidence document in an embedded viewer |

An indicator only gets its own page, and a sidebar entry, if it has published evidence.

## Data structure

Everything is in `data/sdg-data.ts`:

```
SDG (number, title, statement)
└── Target (id, title)
    └── Indicator (id, title, and either link or status)
```

Add indicators with these helpers. The first argument is the indicator number, and the ID and title are built from it.

| Helper | Use for | Site shows |
|---|---|---|
| `doc("2.2.1", "Name", "DRIVE_FILE_ID")` | A PDF | "View PDF" button |
| `img("14.2.1", "Name", "DRIVE_FILE_ID")` | An image | "View Document" button |
| `none("2.1.1", "Name")` | No evidence in the source | "No evidence published" |
| `review("2.5.3", "Name")` | Evidence being corrected | "Evidence being updated" |

The Drive file ID is the part of the link between `/d/` and `/view`.

Where one document covers several indicators, give each indicator the same file ID. For example, 4.1.1, 4.1.2, and 4.1.3 all open the same PDF.

## Adding evidence

1. Copy the final document into the **Public evidence (used by website)** folder of the Drive snapshot. Link to the copy, not the original, so later edits to the original don't change the site.
2. Confirm the file is set to **Anyone with the link: Viewer**. Files in that folder inherit this setting.
3. Update the indicator in `data/sdg-data.ts`, for example changing `review(...)` to `doc(...)`.
4. Run `npm run check:links` and `npm run build`.
5. Merge to `main` to publish.

## Do not publish

- Staff names and "responsibility" columns from the source sheets
- Self-assessment scores and ratings
- Indicator 8.3.1 (Expenditure per employee), unless publication is approved
