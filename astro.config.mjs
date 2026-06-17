// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://barbershop.ru",
  trailingSlash: "never",
  build: {
    format: "directory",
  },
  prefetch: true,
  experimental: {
    clientPrerender: true,
  },
});
