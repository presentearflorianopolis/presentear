import { describe, it, expect } from 'vitest';
import { comBase } from '../../src/lib/base';

describe('comBase', () => {
  it('sem base (raiz), devolve o caminho inalterado', () => {
    expect(comBase('/presentes', '')).toBe('/presentes');
    expect(comBase('/presentes/caixa-bolo', '')).toBe('/presentes/caixa-bolo');
    expect(comBase('/presentes')).toBe('/presentes');
  });

  it('com base, prefixa o caminho', () => {
    expect(comBase('/presentes', '/presentear')).toBe('/presentear/presentes');
    expect(comBase('/presentes/caixa-bolo', '/presentear')).toBe(
      '/presentear/presentes/caixa-bolo',
    );
  });

  it('trata a raiz e âncoras', () => {
    expect(comBase('/', '')).toBe('/');
    expect(comBase('/', '/presentear')).toBe('/presentear');
    expect(comBase('/#personalize', '/presentear')).toBe('/presentear/#personalize');
  });
});
