import { describe, it, expect } from 'vitest';
import { validateOrcamento, buildOrcamentoPayload } from '../../src/lib/orcamento';

describe('orcamento', () => {
  it('exige nome, whatsapp válido e ocasião', () => {
    const r = validateOrcamento({ nome: '', whatsapp: '123', ocasiao: '' });
    expect(r.ok).toBe(false);
    expect(r.errors.nome).toBeTruthy();
    expect(r.errors.whatsapp).toBeTruthy();
    expect(r.errors.ocasiao).toBeTruthy();
  });
  it('aceita entrada válida', () => {
    const r = validateOrcamento({ nome: 'Ana', whatsapp: '48991473599', ocasiao: 'aniversario' });
    expect(r.ok).toBe(true);
  });
  it('normaliza opcionais ausentes', () => {
    const p = buildOrcamentoPayload(
      { nome: 'Ana', whatsapp: '48991473599', ocasiao: 'aniversario' },
      'home',
    );
    expect(p.data).toBe('');
    expect(p.descricao).toBe('');
    expect(p.origem).toBe('home');
  });
});
