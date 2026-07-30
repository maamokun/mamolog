// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://log.mamomamo.live",
  integrations: [pagefind(), icon(), mdx(), sitemap(), react()],
  vite: {
    server: {
      watch: {
        ignored: [
          "**/.obsidian/**",
          "**/_bases/**",
          "**/bases/**",
          "**/_home/**",
          "**/home/**",
          "**/_base/**",
          "**/base/**",
        ],
      },
    },
    assetsInclude: ["**/*.base", "**/.obsidian/**", "**/_bases/**"],
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["astro-leaflet > leaflet"],
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Noto Sans JP",
      cssVariable: "--font-noto-sans-jp",
    },
  ],
  redirects: {
    "/ise": "/posts/ise",
    "/nagoya": "/posts/nagoya",
    "/start-blog": "/posts/start-blog",
    "/fav-places/sumaura-park": "/posts/fav-places/sumaura-park",
  },
});
