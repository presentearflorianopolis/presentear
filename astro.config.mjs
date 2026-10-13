// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: domínio real — usado para canonical e sitemap.
  site: 'https://presentear.example.com',
  // Sem barra de ferramentas de dev (evita ruído no DOM e nos testes e2e).
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
