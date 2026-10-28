import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // gera .next/standalone para a imagem Docker ficar pequena
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
