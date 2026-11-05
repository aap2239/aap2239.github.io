// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aap2239.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // Total CSS is ~8 KB gzipped; inlining it removes every render-blocking request.
    inlineStylesheets: 'always',
  },
  prefetch: false,
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo Black',
      cssVariable: '--font-display',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['Arial Black', 'Impact', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-body',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
    },
  ],
});
