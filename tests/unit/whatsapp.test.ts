import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl, buildProdutoMessage, buildProdutoUrl } from '../../src/lib/whatsapp';

describe('whatsapp', () => {
  it('monta a URL com número e texto encodado', () => {
    const url = buildWhatsAppUrl('Olá! Presente?');
    expect(url.startsWith('https://wa.me/5548991473599?text=')).toBe(true);
    expect(url).toContain(encodeURIComponent('Olá! Presente?'));
  });
  it('mensagem de produto cita o nome', () => {
    expect(buildProdutoMessage('Cesta A')).toContain('Cesta A');
    expect(buildProdutoUrl('Cesta A')).toContain(encodeURIComponent('Cesta A'));
  });
});
