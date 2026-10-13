import { describe, it, expect } from 'vitest';
import { site } from '../../src/config/site';
import { produtos } from '../../src/data';

describe('config', () => {
  it('whatsapp é só dígitos E.164 BR', () => {
    expect(site.whatsapp).toBe('5548991473599');
    expect(/^\d+$/.test(site.whatsapp)).toBe(true);
  });
  it('produtos têm id único', () => {
    const ids = produtos.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('produtos não têm preço', () => {
    for (const p of produtos) expect('preco' in p).toBe(false);
  });
});
