/**
 * Prefixes a file in /public with the site's base path.
 * Next.js does not add the base path to next/image sources or metadata icons,
 * so they would break on a subpath host such as GitHub Pages without this.
 */
export function assetPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}
