// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages (project site): https://presentearflorianopolis.github.io/presentear/
  // `base` é o subcaminho do repositório; os links internos usam `comBase()` (src/lib/base.ts).
  // TODO: ao definir o domínio próprio, trocar `site` e remover `base`.
  site: 'https://presentearflorianopolis.github.io',
  base: '/presentear',
  // Sem barra de ferramentas de dev (evita ruído no DOM e nos testes e2e).
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
