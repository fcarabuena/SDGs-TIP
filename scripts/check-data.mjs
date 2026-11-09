// Validates data/sdg-data.ts. Run with `npm run check:data`.
// Add --links to also confirm that an anonymous visitor can open every Google Drive link.
import { sdgData } from "../data/sdg-data.ts"

const checkLinks = process.argv.includes("--links")
const errors = []
const seenIds = new Set()
const links = new Map()

if (sdgData.length !== 17) errors.push(`Expected 17 SDGs, found ${sdgData.length}`)

for (const sdg of sdgData) {
  if (!sdg.statement?.trim()) errors.push(`SDG ${sdg.number} has no statement`)
  for (const target of sdg.targets) {
    for (const item of [target, ...target.indicators]) {
      if (seenIds.has(item.id)) errors.push(`Duplicate id: ${item.id}`)
      seenIds.add(item.id)
    }
    for (const indicator of target.indicators) {
      if (!indicator.id.startsWith(`sdg-${sdg.number}-`)) errors.push(`${indicator.id} is filed under SDG ${sdg.number}`)
      if (!indicator.title.trim()) errors.push(`${indicator.id} has no title`)
      if (Boolean(indicator.link) === Boolean(indicator.status)) {
        errors.push(`${indicator.id} must have exactly one of link or status`)
      }
      if (indicator.link) links.set(indicator.link, indicator.id)
    }
  }
}

const indicators = sdgData.flatMap((sdg) => sdg.targets.flatMap((target) => target.indicators))
console.log(
  `${sdgData.length} SDGs, ${indicators.length} indicators: ` +
    `${indicators.filter((i) => i.link).length} with evidence, ` +
    `${indicators.filter((i) => i.status === "no-evidence").length} without, ` +
    `${indicators.filter((i) => i.status === "under-review").length} being updated; ` +
    `${links.size} unique documents`
)

if (checkLinks) {
  const entries = [...links]
  const results = []
  for (let start = 0; start < entries.length; start += 8) {
    results.push(
      ...(await Promise.all(
        entries.slice(start, start + 8).map(async ([link, id]) => {
          const response = await fetch(link, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" })
          const blocked = !response.ok || new URL(response.url).hostname.startsWith("accounts.")
          return blocked ? `${id}: not publicly viewable (${response.status}) ${link}` : null
        })
      ))
    )
  }
  errors.push(...results.filter(Boolean))
  console.log(`Checked ${entries.length} links anonymously`)
}

if (errors.length > 0) {
  console.error(`\n${errors.length} problem(s):\n${errors.map((e) => `- ${e}`).join("\n")}`)
  process.exit(1)
}
console.log("Data is valid")
