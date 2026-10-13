/**
 * `base` do deploy — no GitHub Pages o site fica em `/<repositório>/`.
 * Normalizado sem a barra final (`'/'` vira `''`).
 */
const BASE_PADRAO = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');

/**
 * Prefixa um caminho interno com o `base` do deploy.
 * Use só em caminhos internos — links externos (WhatsApp, Instagram) passam direto.
 */
export function comBase(path: string, base: string = BASE_PADRAO): string {
  if (path === '/') return base || '/';
  return `${base}${path}`;
}
