export interface SiteTextos {
  heroCta: string;
  personalizacaoTitulo: string;
  personalizacaoTexto: string;
  personalizacaoCta: string;
  sobreTitulo: string;
  /** TODO: hoje é lorem ipsum / placeholder — substituir pelo texto real da marca. */
  sobreTexto: string;
  ctaFinalTitulo: string;
  ctaFinalBotao: string;
  ctaProduto: string;
  /** Botão do card que abre a página interna da caixa. */
  ctaSaibaMais: string;
  /** Link da página interna de volta para a lista de caixas. */
  produtoVoltar: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  mensagemPrincipal: string;
  mensagemComplementar: string;
  /** Dígitos E.164 (sem +) — base dos links wa.me. */
  whatsapp: string;
  /** Forma exibida ao usuário. */
  whatsappDisplay: string;
  instagram: string;
  instagramUrl: string;
  /** TODO: e-mail de destino dos leads (a fornecer) — usado pelo Apps Script. */
  email: string;
  /** Endpoint do formulário (Apps Script). Vazio = dependente de configuração. */
  formEndpoint: string;
  /** Opções do campo "Ocasião" do formulário de orçamento (não é navegação). */
  ocasioesFormulario: string[];
  textos: SiteTextos;
}

export const site: SiteConfig = {
  name: 'Presentear',
  tagline: 'Presentear Florianópolis',
  mensagemPrincipal: 'Mais que presentes, são momentos que ficam.',
  mensagemComplementar:
    'Presentes criativos, cheios de significado e feitos para surpreender em qualquer ocasião.',
  whatsapp: '5548991473599',
  whatsappDisplay: '+55 48 99147-3599',
  instagram: 'PresentearFlorianopolis',
  instagramUrl: 'https://instagram.com/PresentearFlorianopolis',
  email: '',
  formEndpoint: (import.meta.env?.PUBLIC_FORM_ENDPOINT as string | undefined) ?? '',
  ocasioesFormulario: [
    'Aniversário',
    'Romântico',
    'Agradecimento',
    'Datas especiais',
    'Presente personalizado',
    'Outro',
  ],
  textos: {
    heroCta: 'ENCONTRE SEU PRESENTE',
    personalizacaoTitulo: 'Cada detalhe pode dizer muito.',
    personalizacaoTexto:
      'Vamos criar um presente especial para alguém importante para você?',
    personalizacaoCta: 'PERSONALIZE SEU PRESENTE',
    sobreTitulo: 'Sobre a Presentear',
    sobreTexto:
      'Conteúdo em preparação — este texto será substituído pela história real da Presentear.',
    ctaFinalTitulo: 'Vamos transformar seu carinho em presente?',
    ctaFinalBotao: 'FALE COM A PRESENTEAR',
    ctaProduto: 'QUERO ESTE PRESENTE',
    ctaSaibaMais: 'SAIBA MAIS',
    produtoVoltar: 'Todas as caixas',
  },
};
