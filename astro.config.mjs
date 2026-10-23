// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://latelierpsy.com',

  vite: {
    plugins: [tailwindcss()]
  },

  output: 'static',

  adapter: netlify(),

  redirects: {
    '/ateliers/atelier-estime-de-soi': '/ateliers/estime-de-soi',
  },

  integrations: [
    vue(),
    mdx(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    sitemap({
      filter: (page) => !page.includes('/gifts/'),
    }),
  ],

  image: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "yt3.ggpht.com" },
    ],
  },
});