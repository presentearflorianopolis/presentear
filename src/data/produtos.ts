import type { ImageMetadata } from 'astro';
import caixaPresente from '../assets/produtos/caixa-presente.jpg';
import caixaSossego from '../assets/produtos/caixa-sossego.jpg';
import caixaBolo from '../assets/produtos/caixa-bolo.jpg';
import caixaPresenteExtra from '../assets/produtos/caixa-presente-2.webp';
import caixaSossegoExtra from '../assets/produtos/caixa-sossego-2.jpeg';
import caixaBoloExtra from '../assets/produtos/caixa-bolo-2.webp';

/** Foto de uma caixa. `src: null` = sem foto real ainda → usar placeholder. */
export interface FotoCaixa {
  src: ImageMetadata | null;
  alt: string;
}

export interface Produto {
  id: string;
  nome: string;
  /** Frase curta, usada nos cards da home e de /presentes. */
  descricao: string;
  /** Texto longo da página interna da caixa. */
  descricaoLonga: string;
  /** Etiqueta só deve existir quando for verdadeira (ex.: "Personalizável"). */
  etiqueta?: string;
  /** Foto de capa, usada nos cards. `null` = sem foto real ainda → usar placeholder. */
  imagem: ImageMetadata | null;
  imagemAlt: string;
  /** Fotos adicionais, mostradas na página interna da caixa além da capa. */
  fotosExtras: FotoCaixa[];
}

/**
 * Presentes.
 *
 * ATENÇÃO (temporário):
 * - As fotos de capa (`imagem`) são as IMAGENS DE REFERÊNCIA fornecidas, com
 *   marca-d'água de outra marca ("Par Tuu Receber") e o selo "Imagem ilustrativa" —
 *   usadas só para apresentação. Substituir pelas fotos reais da Presentear (trocar
 *   os arquivos em `src/assets/produtos/`).
 * - As `fotosExtras` (uma por caixa) vieram da proprietária e aparecem na página
 *   interna de cada caixa.
 * - As descrições (curta e longa) também são provisórias. A `descricaoLonga` aparece
 *   na página interna já marcada como "em preparação" e deve ser substituída pelo
 *   texto real, confirmado pela proprietária.
 */
export const produtos: Produto[] = [
  {
    id: 'caixa-presente',
    nome: 'Caixa Presente',
    descricao: 'Caixa de madeira com espumante, balão personalizado e flores secas.',
    descricaoLonga:
      'Descrição em preparação — este texto provisório será substituído pela descrição completa da Caixa Presente.',
    imagem: caixaPresente,
    imagemAlt: 'Caixa de madeira com espumante, balão e flores secas',
    fotosExtras: [{ src: caixaPresenteExtra, alt: 'Cesta de café da manhã com laço dourado' }],
  },
  {
    id: 'caixa-sossego',
    nome: 'Caixa Sossego',
    descricao: 'Caneca personalizada com inicial, chocolates e flores secas.',
    descricaoLonga:
      'Descrição em preparação — este texto provisório será substituído pela descrição completa da Caixa Sossego.',
    etiqueta: 'Personalizável',
    imagem: caixaSossego,
    imagemAlt: 'Caixa com caneca personalizada, chocolates e flores secas',
    fotosExtras: [
      { src: caixaSossegoExtra, alt: 'Cesta de doces embalada em celofane com laço vermelho' },
    ],
  },
  {
    id: 'caixa-bolo',
    nome: 'Caixa com Bolo',
    descricao: 'Arranjo de balões coloridos com bolo e cartão comemorativo.',
    descricaoLonga:
      'Descrição em preparação — este texto provisório será substituído pela descrição completa da Caixa com Bolo.',
    imagem: caixaBolo,
    imagemAlt: 'Caixa com bolo, balões coloridos e cartão',
    fotosExtras: [{ src: caixaBoloExtra, alt: 'Cesta de chocolates e doces com laço vermelho' }],
  },
];
