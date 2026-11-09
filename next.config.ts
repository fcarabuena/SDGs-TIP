import type { NextConfig } from "next"

// GitHub Pages serves the site from /SDGs-TIP; the deploy workflow sets this. Local runs leave it empty.
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
