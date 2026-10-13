/**
 * `base` do deploy (ver `astro.config.mjs`): no GitHub Pages o site é servido em
 * `/<repositório>/`. Os testes usam caminhos **relativos** (resolvidos contra a
 * `baseURL`) e este prefixo para conferir os links internos.
 */
export const BASE = '/presentear';
