export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  categoriaId: string;
  /** Etiqueta só deve existir quando for verdadeira (ex.: "Personalizável"). */
  etiqueta?: string;
  /** `null` = sem foto real ainda → usar placeholder. */
  imagem: string | null;
  imagemAlt: string;
}

/**
 * Produtos iniciais.
 *
 * TODO: nomes e descrições são PROVISÓRIOS (derivados das imagens de referência,
 * que têm marca-d'água de terceiros) e devem ser confirmados/substituídos pela
 * proprietária. Sem fotos reais → `imagem: null`.
 */
export const produtos: Produto[] = [
  {
    id: 'cesta-celebracao',
    nome: 'Cesta Celebração',
    descricao: 'Caixa de madeira com espumante, balão personalizado e flores secas.',
    categoriaId: 'datas-especiais',
    imagem: null,
    imagemAlt: 'Cesta de madeira com espumante, balão e flores secas',
  },
  {
    id: 'cesta-parabens',
    nome: 'Cesta Parabéns',
    descricao: 'Arranjo de balões coloridos com bolo e cartão comemorativo.',
    categoriaId: 'aniversario',
    imagem: null,
    imagemAlt: 'Cesta de aniversário com balões coloridos, bolo e cartão',
  },
  {
    id: 'cesta-personalizada',
    nome: 'Cesta Personalizada',
    descricao: 'Caneca personalizada com inicial, chocolates e flores secas.',
    categoriaId: 'personalizados',
    etiqueta: 'Personalizável',
    imagem: null,
    imagemAlt: 'Cesta com caneca personalizada, chocolates e flores secas',
  },
];
