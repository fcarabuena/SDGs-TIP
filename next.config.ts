import type { NextConfig } from "next"

// Only needed when the site is served from a subpath, as on GitHub Pages. Render serves it from the root.
const basePath = process.env.PAGES_BASE_PATH ?? ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
