import { describe, it, expect } from 'vitest';
import { site } from '../../src/config/site';
import { produtos, categorias } from '../../src/data';

describe('config', () => {
  it('whatsapp é só dígitos E.164 BR', () => {
    expect(site.whatsapp).toBe('5548991473599');
    expect(/^\d+$/.test(site.whatsapp)).toBe(true);
  });
  it('cada produto referencia uma categoria existente', () => {
    const ids = new Set(categorias.map((c) => c.id));
    for (const p of produtos) expect(ids.has(p.categoriaId)).toBe(true);
  });
  it('produtos não têm preço', () => {
    for (const p of produtos) expect('preco' in p).toBe(false);
  });
});
