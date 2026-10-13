import type { ImageMetadata } from 'astro';
import caixaPresente from '../assets/produtos/caixa-presente.jpg';
import caixaSossego from '../assets/produtos/caixa-sossego.jpg';
import caixaBolo from '../assets/produtos/caixa-bolo.jpg';

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  /** Etiqueta só deve existir quando for verdadeira (ex.: "Personalizável"). */
  etiqueta?: string;
  /** `null` = sem foto real ainda → usar placeholder. */
  imagem: ImageMetadata | null;
  imagemAlt: string;
}

/**
 * Presentes.
 *
 * ATENÇÃO (temporário): as fotos atuais são as IMAGENS DE REFERÊNCIA fornecidas,
 * que têm marca-d'água de outra marca ("Par Tuu Receber") e o selo "Imagem
 * ilustrativa" — usadas aqui só para apresentação. Substituir pelas fotos reais
 * da Presentear (trocar os arquivos em `src/assets/produtos/`). As descrições
 * também são provisórias e devem ser confirmadas pela proprietária.
 */
export const produtos: Produto[] = [
  {
    id: 'caixa-presente',
    nome: 'Caixa Presente',
    descricao: 'Caixa de madeira com espumante, balão personalizado e flores secas.',
    imagem: caixaPresente,
    imagemAlt: 'Caixa de madeira com espumante, balão e flores secas',
  },
  {
    id: 'caixa-sossego',
    nome: 'Caixa Sossego',
    descricao: 'Caneca personalizada com inicial, chocolates e flores secas.',
    etiqueta: 'Personalizável',
    imagem: caixaSossego,
    imagemAlt: 'Caixa com caneca personalizada, chocolates e flores secas',
  },
  {
    id: 'caixa-bolo',
    nome: 'Caixa com Bolo',
    descricao: 'Arranjo de balões coloridos com bolo e cartão comemorativo.',
    imagem: caixaBolo,
    imagemAlt: 'Caixa com bolo, balões coloridos e cartão',
  },
];
