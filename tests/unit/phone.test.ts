import { describe, it, expect } from 'vitest';
import { maskPhoneBR, isValidPhoneBR } from '../../src/lib/phone';

describe('phone', () => {
  it('mascara 11 dígitos', () => {
    expect(maskPhoneBR('48991473599')).toBe('(48) 99147-3599');
  });
  it('mascara 10 dígitos', () => {
    expect(maskPhoneBR('4833334444')).toBe('(48) 3333-4444');
  });
  it('aceita com +55', () => {
    expect(isValidPhoneBR('+55 48 99147-3599')).toBe(true);
  });
  it('rejeita curto', () => {
    expect(isValidPhoneBR('123')).toBe(false);
  });
  it('aceita fixo de 10 dígitos com +55', () => {
    expect(isValidPhoneBR('+55 48 3333-4444')).toBe(true);
  });
  it('não confunde DDD 55 com código do país', () => {
    expect(isValidPhoneBR('5533334444')).toBe(true);
    expect(maskPhoneBR('5533334444')).toBe('(55) 3333-4444');
  });
});
