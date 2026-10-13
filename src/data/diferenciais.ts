export interface Diferencial {
  id: string;
  titulo: string;
  /** Chave do ícone linear usado na faixa de diferenciais. */
  icone: string;
}

/**
 * TODO: confirmar que a marca realmente oferece TODOS estes diferenciais
 * (ver §15.5 do documento de design) antes de publicar.
 */
export const diferenciais: Diferencial[] = [
  { id: 'embalagem', titulo: 'Embalagem especial', icone: 'gift' },
  { id: 'personalizacao', titulo: 'Opções de personalização', icone: 'sparkles' },
  { id: 'atendimento', titulo: 'Atendimento personalizado', icone: 'chat' },
  { id: 'ocasioes', titulo: 'Presentes para diferentes ocasiões', icone: 'calendar' },
];
