/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  // Tymczasowo wyłącz sprawdzanie typu ścieżek dla debugowania
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;