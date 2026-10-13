export interface Categoria {
  id: string;
  nome: string;
  imagem: string | null;
  imagemAlt: string;
}

/** Ocasiões/categorias do catálogo. Imagens pendentes até chegarem as fotos reais. */
export const categorias: Categoria[] = [
  {
    id: 'aniversario',
    nome: 'Aniversário',
    imagem: null,
    imagemAlt: 'Cesta de aniversário da Presentear',
  },
  {
    id: 'romantico',
    nome: 'Romântico',
    imagem: null,
    imagemAlt: 'Cesta romântica da Presentear',
  },
  {
    id: 'agradecimento',
    nome: 'Agradecimento',
    imagem: null,
    imagemAlt: 'Cesta de agradecimento da Presentear',
  },
  {
    id: 'datas-especiais',
    nome: 'Datas especiais',
    imagem: null,
    imagemAlt: 'Cesta para datas especiais da Presentear',
  },
  {
    id: 'personalizados',
    nome: 'Presentes personalizados',
    imagem: null,
    imagemAlt: 'Presente personalizado da Presentear',
  },
];
