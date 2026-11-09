/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Disables server-side image optimization
  },
  // If your site is hosted at username.github.io/repository-name, add the subpath:
  // basePath: '/repository-name',
};

module.exports = nextConfig;
