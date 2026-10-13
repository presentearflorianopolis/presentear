// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: domínio real — usado para canonical e sitemap.
  site: 'https://presentear.example.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
