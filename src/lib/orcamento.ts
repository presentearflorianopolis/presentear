import { isValidPhoneBR } from './phone';

export interface OrcamentoInput {
  nome: string;
  whatsapp: string;
  ocasiao: string;
  data?: string;
  faixa?: string;
  descricao?: string;
}

export interface OrcamentoPayload {
  nome: string;
  whatsapp: string;
  ocasiao: string;
  data: string;
  faixa: string;
  descricao: string;
  origem: string;
}

export type OrcamentoErrors = Partial<Record<keyof OrcamentoInput, string>>;

export interface OrcamentoValidation {
  ok: boolean;
  errors: OrcamentoErrors;
}

/** Exige nome, WhatsApp válido e ocasião; data/faixa/descrição são opcionais. */
export function validateOrcamento(input: OrcamentoInput): OrcamentoValidation {
  const errors: OrcamentoErrors = {};
  if (!input.nome?.trim()) errors.nome = 'Informe seu nome.';
  if (!isValidPhoneBR(input.whatsapp ?? '')) {
    errors.whatsapp = 'Informe um WhatsApp válido com DDD.';
  }
  if (!input.ocasiao?.trim()) errors.ocasiao = 'Escolha a ocasião.';
  return { ok: Object.keys(errors).length === 0, errors };
}

/** Normaliza os campos (opcionais ausentes viram string vazia) para envio. */
export function buildOrcamentoPayload(input: OrcamentoInput, origem: string): OrcamentoPayload {
  const t = (v?: string) => (v ?? '').trim();
  return {
    nome: t(input.nome),
    whatsapp: t(input.whatsapp),
    ocasiao: t(input.ocasiao),
    data: t(input.data),
    faixa: t(input.faixa),
    descricao: t(input.descricao),
    origem,
  };
}
