// Filtro client-side do catálogo, dirigido por `?categoria=<id>`.
import { track } from '../lib/track';

function aplicar(cat: string): void {
  document.querySelectorAll<HTMLElement>('[data-categoria]').forEach((el) => {
    el.hidden = Boolean(cat) && el.dataset.categoria !== cat;
  });

  document.querySelectorAll<HTMLButtonElement>('#filtros [data-filtro]').forEach((b) => {
    b.setAttribute('aria-pressed', String((b.dataset.filtro ?? '') === cat));
  });

  const vazio = document.getElementById('vazio');
  if (vazio) {
    const algumVisivel = Array.from(
      document.querySelectorAll<HTMLElement>('[data-categoria]'),
    ).some((el) => !el.hidden);
    vazio.hidden = algumVisivel;
  }

  const query = cat ? `?categoria=${encodeURIComponent(cat)}` : '';
  history.replaceState({}, '', `${location.pathname}${query}`);
}

const inicial = new URLSearchParams(location.search).get('categoria') ?? '';
aplicar(inicial);

document.getElementById('filtros')?.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-filtro]');
  if (!btn) return;
  const cat = btn.dataset.filtro ?? '';
  aplicar(cat);
  track('categoria', { categoria: cat });
});
