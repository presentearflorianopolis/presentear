# Documento de Design — Site Presentear (Florianópolis)

Data: 2026-10-13
Status: aguardando aprovação
Tipo: site de apresentação de produtos + geração de leads (sem loja virtual)

---

## 1. Intenção e o porquê

A **Presentear** (Presentear Florianópolis) é uma marca de cestas de presente
montadas com cuidado, com embalagens elegantes e direção de arte editorial. O
site existe para:

1. Apresentar os produtos e a marca com acabamento premium e desejo visual.
2. Transformar visitantes em contatos comerciais (leads).

Não existe compra online. A conversão acontece por **WhatsApp** e por um
**formulário de orçamento**. O público chega majoritariamente por **Instagram**,
portanto a experiência precisa ser **mobile first** de verdade — não um desktop
encolhido.

O resultado não deve parecer template de e-commerce, e sim uma boutique
autoral contemporânea de presentes.

Mensagem principal: *"Mais que presentes, são momentos que ficam."*
Mensagem complementar: *"Presentes criativos, cheios de significado e feitos
para surpreender."*

---

## 2. Objetivos

- Homepage completa, responsiva e visualmente marcante.
- Catálogo navegável por categoria/ocasião, sem carrinho.
- Botões de "quero este presente" que abrem o WhatsApp com mensagem pré-preenchida
  citando o produto.
- Formulário de orçamento que entrega o lead **por e-mail e numa planilha Google
  Sheets**, de verdade.
- Animações elegantes e leves, com respeito a `prefers-reduced-motion`.
- SEO técnico básico, acessibilidade e performance.
- Todo dado comercial (WhatsApp, Instagram, logo, produtos, categorias, textos)
  centralizado em configuração editável.

## 3. Não-objetivos (fora de escopo)

- Carrinho de compras, checkout, pagamento online.
- Conta de usuário / login.
- Estoque, pedido, rastreio.
- Blog, CMS headless nesta fase (pode ser considerado depois, sem retrabalho).
- Painel administrativo.

## 4. Anti-objetivos (o que faria o projeto falhar)

- Parecer um template genérico de e-commerce.
- Inventar produtos, preços, avaliações, endereço, CNPJ ou história da empresa.
- Publicar foto com marca-d'água de outra marca ou "imagem ilustrativa".
- Formulário que finge enviar e mostra sucesso falso.
- Botão sem destino funcional ou link quebrado.
- Animação pesada que atrapalha carregamento/leitura.

---

## 5. Restrições

- Fotografias reais da Presentear **ainda não existem**. As três imagens
  fornecidas são **referência** e têm marca-d'água de terceiros ("Par Tiu" /
  "Imagem Ilustrativa") → **não** podem ir ao ar. O site usa **espaços reservados
  elegantes e óbvios de substituir** até chegarem as fotos próprias.
- Texto "Sobre" está como **lorem ipsum** por enquanto → seção montada, conteúdo
  real pendente.
- Sem backend próprio. O destino do formulário é resolvido com Google Apps Script.
- Nada de credencial secreta no front-end.

---

## 6. Decisões de identidade visual

### 6.1 Tensão de paleta (resolvida)

A **logo fornecida é marrom/mostarda quente sobre creme**. O briefing pedia
**verde-oliva** como cor institucional. As duas convivem mal. **Decisão:** ancorar
a identidade na logo e tratar o marrom como cor institucional; o verde-oliva
recua para acento pontual (ou é dispensado). *(decisão tomada por mim — o briefing
autoriza priorizar harmonia.)*

Paleta de trabalho (o hex exato do marrom deve ser amostrado direto do arquivo da
logo no momento da implementação):

| Papel | Cor | Uso |
|---|---|---|
| Creme | `#F5EFE5` | fundo predominante |
| Marrom institucional (da logo) | ~`#8B5E34` (amostrar) | marca, botões principais |
| Bege natural | `#D5BFA2` | apoio, divisórias |
| Terracota | `#B87556` | detalhes e pequenos destaques |
| Grafite quente | `#292B24` | texto e interface |
| Verde-oliva | `#35432C` | acento opcional pontual |

Direção: fundos creme, tipografia editorial, muito espaço negativo, contraste
alto para legibilidade. Sem gradientes coloridos, neon ou sombras pesadas.

### 6.2 Tipografia

- Títulos: **Cormorant Garamond** (grande, editorial).
- Textos/menus/botões: **DM Sans**.
- Etiquetas pequenas em caixa alta com espaçamento sutil.
- Evitar excesso de negrito e fontes decorativas.

### 6.3 Logo

Usar **exatamente** o arquivo fornecido. Não recriar, não modificar, não
recolorir sem autorização. Variações necessárias: versão principal (creme/branco)
e uma versão sobre fundo claro (a própria da logo). *(a decidir quando o arquivo
editável — SVG/PNG transparente — for entregue; ver §15.)*

---

## 7. Arquitetura de informação (páginas)

1. **Home** — apresentação completa + CTAs.
2. **Presentes (catálogo)** — grade filtrável por categoria/ocasião.
3. **Ocasiões** — página ou seção que agrupa presentes por ocasião (pode ser âncora do catálogo com filtro).
4. **Personalize** — seção de personalização na home + CTA para form/WhatsApp. *(decisão minha: seção, não página separada, nesta fase.)*
5. **Sobre** — apresentação da marca (conteúdo real pendente).
6. **Contato / Orçamento** — formulário de orçamento.
7. **Política de Privacidade** — *(decisão minha: a rota e o link do rodapé só entram quando o texto real existir; enquanto isso a página não é publicada, para não haver link quebrado nem conteúdo jurídico inventado.)*

Navegação principal: Início · Presentes · Ocasiões · Personalize · Sobre nós ·
botão/ícone de contato (WhatsApp). **Sem** ícone de sacola.

**Ocasiões** *(decisão minha: âncora/visão filtrada do catálogo, não página própria, para reduzir páginas vazias nesta fase.)*

---

## 8. Homepage (seções, em ordem)

### A. Cabeçalho
Minimalista, responsivo. Transparente sobre o hero e assume fundo creme após a
rolagem. No celular: menu compacto e acessível (abertura/fechamento suaves,
foco gerenciado, fecha com Esc / clique fora).

### B. Hero (primeira dobra — seção mais importante)
Composição editorial assimétrica, com foto real (ou placeholder elegante)
ocupando parte significativa da tela. Título grande em Cormorant, subtítulo,
botão principal **"ENCONTRE SEU PRESENTE"** → catálogo. Fundo creme, negativos
generosos, detalhes discretos em marrom institucional.

### C. Faixa de diferenciais
Faixa horizontal com 4 diferenciais + ícones lineares minimalistas:
Embalagem especial · Opções de personalização · Atendimento personalizado ·
Presentes para diferentes ocasiões. *(apresentar apenas o que a marca realmente
oferece — §15.)*

### D. Categorias por ocasião
Título "Encontre o presente ideal". Cards visuais: Aniversário · Romântico ·
Agradecimento · Datas especiais · Presentes personalizados. Cada card: foto, nome,
indicador discreto, interação hover/toque → catálogo filtrado ou seção.

### E. Seleção de presentes
Título "Escolhas que encantam". Grade visual sofisticada com os produtos reais
(hoje: placeholders + 3 tipos de referência). Card: foto, nome, descrição breve,
etiqueta opcional **somente quando verdadeira** ("Personalizável", "Edição
especial"), botão **"QUERO ESTE PRESENTE"** → WhatsApp com mensagem pré-preenchida.
Sem preços fictícios.

### F. Personalização
Forte impacto visual: fundo marrom institucional, tipografia elegante, foto real de
detalhe de embalagem/cartão. Título "Cada detalhe pode dizer muito." Texto
"Vamos criar um presente especial para alguém importante para você?" Botão
**"PERSONALIZE SEU PRESENTE"** → form de orçamento ou WhatsApp.

### G. Sobre a Presentear
Apresentação breve e emocional. **Sem inventar** história/missão/tempo de mercado.
Seção pronta para preenchimento (hoje: lorem ipsum).

### H. Chamada final
"Vamos transformar seu carinho em presente?" + botão **"FALE COM A PRESENTEAR"**
→ WhatsApp oficial.

### I. Rodapé
Logo, frase institucional, links de navegação, Instagram, WhatsApp, informações
comerciais (a fornecer), Política de Privacidade (quando aplicável). **Sem**
inventar endereço/CNPJ/telefone além do WhatsApp informado.

---

## 9. Catálogo e ocasiões

- Grade de produtos com filtro por ocasião/categoria (client-side, sem backend).
- Card igual ao da homepage; CTA WhatsApp com nome do produto na mensagem.
- Estados de carregamento/erro tratados.
- Sem carrinho/checkout.

Produtos iniciais (nomes provisórios — **pendente** aprovação da proprietária,
§15). Com base nas referências:

| Ref | Descrição | Categoria provisória |
|---|---|---|
| Cesta 1 | Balão "Feliz Dia" + espumante + flores secas (caixa de madeira) | Datas especiais |
| Cesta 2 | Balões de parabéns + bolo + cartão personalizado | Aniversário |
| Cesta 3 | Caneca personalizada + chocolates + flores secas | Presentes personalizados |

> Enquanto não houver fotos próprias, cada card usa um placeholder elegante
> (fundo creme/bege com legenda) claramente identificado como imagem pendente.

---

## 10. Geração de leads (núcleo do site)

### 10.1 Configuração central
`src/config/site.ts` guarda, em um só lugar: logo, **WhatsApp `+55 48 99147-3599`**,
Instagram `@PresentearFlorianopolis`, textos institucionais, e-mail de destino dos
leads, endpoint do formulário. Nenhum telefone/link espalhado pelo código.

### 10.2 WhatsApp
Todos os CTAs usam o mesmo destino configurável. Contatos vindos de um produto
incluem o nome dele na mensagem inicial.

Mensagem padrão por produto:
> "Olá! Conheci a Presentear pelo site e gostaria de saber mais sobre o produto
> [NOME DO PRODUTO]. Poderiam me passar as informações, disponibilidade e opções
> de personalização?"

### 10.3 Formulário de orçamento
Campos: Nome · WhatsApp · Ocasião · Data desejada · Faixa de investimento
(opcional) · Descrição (opcional).
Inclui: validação de campos, máscara BR de telefone, mensagens de erro claras,
indicador de envio, confirmação **real** após sucesso.

### 10.4 Destino dos leads (decidido)
Os dados vão **para uma planilha Google Sheets e para um e-mail**, ao mesmo tempo.

**Implementação escolhida: Google Apps Script Web App.**
- A planilha hospeda um script publicado como Web App (`doPost`) que recebe o POST
  do formulário, acrescenta uma linha e dispara e-mail de notificação
  (`MailApp`/`GmailApp`).
- Vantagens: grátis, sem backend, sem credencial exposta no front-end.
- O site faz o POST do formulário para o endpoint configurável.
- **Se o endpoint ainda não estiver publicado**, a integração fica pronta e
  claramente marcada como *dependente de configuração* — o site **não** simula
  envio bem-sucedido; em caso de falha mostra erro e oferece o WhatsApp.
- Alternativa registrada (não escolhida): função serverless (Vercel) + API do
  Sheets + Resend. Mais controle, mais partes móveis/chaves.

**Sequenciamento (decidido com a proprietária):** nesta fase o formulário já é
implementado e aponta para um **endpoint configurável**. A criação da planilha, a
publicação do script e a ligação do destino real acontecem **automaticamente
depois da aprovação do site em ambiente local**, com a proprietária concedendo
acesso ao Google. Até lá, o endpoint é um espaço reservado marcado como
*dependente de configuração* — o site nunca simula envio bem-sucedido.

### 10.5 Mensuração
Eventos preparados para: clique no WhatsApp, clique por produto, envio de
formulário, categorias mais acessadas, origem do lead quando disponível.
Respeitar consentimento/LGPD; nenhum rastreador sem base legal.

**Decisão (confirmada com a proprietária):** implementar apenas uma **camada de
eventos neutra** (atributos `data-*` + uma função `track()` única), **sem carregar
nenhum provedor de terceiros por padrão**. A escolha e a integração do provedor de
mensuração (GA4/Plausible etc.) ficam para depois; os pontos de medição ficam como
**placeholders** prontos. Enquanto não houver rastreador de terceiros, não é
necessário banner de consentimento.

---

## 11. Animações

- **Entrada inicial:** header/logo surgem suavemente; título (opacidade + vertical);
  subtítulo; botão; imagem com escala discreta. Sem atrasar interação.
- **Rolagem:** entradas progressivas (opacidade + deslocamento vertical discreto)
  via Intersection Observer, só onde fizer sentido.
- **Imagens de produto (hover):** leve zoom, card sobe alguns px, realce sutil no
  botão; cantos/bordas/sombras discretos. No mobile: clareza e resposta ao toque,
  sem depender de hover.
- **Parallax:** no máximo muito sutil no hero, e só se não custar performance.
- **Botões:** transições de cor/opacidade/ícone; estados hover, foco, clique,
  desabilitado.
- **Menu móvel:** abertura/fechamento suaves, acessível.
- Técnica: `transform`/`opacity`, CSS nativo + JS leve. **Sem bibliotecas pesadas.**
  Respeitar `prefers-reduced-motion`. Conteúdo acessível mesmo se a animação não rodar.

---

## 12. Responsividade (mobile first)

Desenvolver primeiro para celular e expandir. Funcionar muito bem em celular,
tablet, notebook e monitor grande.

No celular: títulos sem quebras ruins, fotos com enquadramento adequado, cards em
1–2 colunas conforme a largura, área de toque confortável, menu acessível,
formulário simples, animações leves, **nenhuma rolagem horizontal involuntária**.

---

## 13. Tecnologia e estrutura

**Stack: Astro + Tailwind CSS** *(decisão minha)*. Motivos: site de conteúdo/
apresentação com foco em SEO, performance e mobile first; HTML leve, componentes
reutilizáveis, otimização de imagem embutida, zero JS desnecessário; deploy fácil
(Vercel/Netlify). Alternativa registrada: Next.js (mais pesado, desnecessário aqui).

Estrutura de pastas (proposta):

```
src/
  config/site.ts          # logo, whatsapp, instagram, textos, contato, endpoint
  data/
    produtos.ts           # produtos (nome, descrição, etiqueta, imagem, categoria)
    categorias.ts         # categorias/ocasiões
    diferenciais.ts
  components/             # Header, Footer, Hero, ProductCard, CategoryCard, ...
  layouts/                # BaseLayout (SEO/metadados, fontes, tema)
  pages/                  # index, presentes, ocasioes, personalize, sobre,
                          # contato, politica-de-privacidade
  styles/                 # Tailwind + tokens de tema
public/                   # logo, favicon
```

Requisitos: SEO técnico básico, acessibilidade, contraste, carregamento otimizado
de imagens, metadados/títulos por página, estados de erro/carregamento, nenhum
botão sem função, nenhum link quebrado, nenhuma informação inventada.

---

## 14. Critérios de aceitação

- Homepage implementada e responsiva (mobile first).
- Identidade visual consistente com este documento.
- Placeholders claros onde faltam fotos reais (sem marca-d'água de terceiros).
- Animações funcionando em desktop e celular, com `prefers-reduced-motion`.
- Catálogo permite visualizar e navegar por produtos/categorias.
- Botões de interesse abrem o WhatsApp correto, com o nome do produto quando aplicável.
- Formulário conectado ao Apps Script (Sheets + e-mail) **ou** claramente
  identificado como dependente de configuração — nunca sucesso falso.
- Sem carrinho, checkout ou pagamento.
- Metadados, estrutura semântica e cuidados de acessibilidade.
- Principais fluxos testados.

---

## 15. Pendências que dependem da proprietária ("theirs")

1. **Fotos reais** dos produtos (e do "Sobre"/personalização). Até então: placeholders.
2. **Texto do "Sobre"** (hoje lorem ipsum) + fatos reais da marca.
3. **Nomes finais dos produtos** (hoje provisórios) e descrições.
4. **Arquivo da logo** em alta/transparente (idealmente SVG) para todos os usos.
5. **Diferenciais reais** que a marca efetivamente oferece (§8.C).
6. **E-mail de destino** dos leads (para o Apps Script notificar).
7. **Informações comerciais** para o rodapé (endereço, CNPJ etc.) — só se existirem;
   caso contrário o rodapé omite.
8. **Política de Privacidade** (texto) — ou confirmar que não será publicada agora.
9. **Faixa de investimento**: confirmar se deve existir opção e quais faixas.
10. Confirmar que **não** haverá preços exibidos.
11. **Mensuração:** *(resolvido)* adiada — camada de eventos neutra com
    placeholders agora; provedor depois (§10.5).
12. **Apps Script:** *(resolvido)* será criado/publicado automaticamente após a
    aprovação local, com acesso ao Google da proprietária (§10.4).
13. **Deploy:** *(resolvido)* repositório no GitHub e deploy na Vercel via servidores
    MCP, executados por mim após a aprovação do site em local (§17).
14. **Arquivos:** ainda pendente — enviar a logo em alta/transparente (idealmente
    SVG) e, se quiser, os arquivos das imagens de referência. Até lá: placeholders
    e marrom provisório `#8B5E34`.
15. **Consentimento/LGPD:** *(resolvido nesta fase)* sem rastreador de terceiros,
    logo sem banner; reavaliar quando a mensuração for integrada.

## 16. Chamadas que eu fiz (o builder pode assumir; revisar ao ler)

- Stack Astro + Tailwind.
- Paleta ancorada na logo; verde-oliva demovido a acento.
- Apps Script como destino do formulário (Sheets + e-mail).
- Produtos com nomes provisórios e imagens placeholder.
- Astro + componente de formulário apontando para endpoint configurável.
- Sem CMS nesta fase; dados em arquivos de configuração tipados.
- "Ocasiões" como visão filtrada do catálogo, não página própria.
- "Personalize" como seção da home, não página própria (nesta fase).
- Política de Privacidade: rota/link só quando o texto real existir.
- Mensuração: camada de eventos neutra, sem provedor de terceiros por padrão.
- Anti-spam do formulário: honeypot + validação no endpoint.

---

## 17. Sequenciamento e próximo passo

1. Aprovar este documento.
2. **Plano de implementação** (writing-plans) → execução.
3. Construir o site e revisar **em ambiente local**.
4. **Após aprovação local:** repositório no **GitHub** e deploy na **Vercel** (via
   servidores MCP de GitHub e Vercel, adicionados pela proprietária).
5. **Após aprovação local:** criar/publicar o **Google Apps Script** (planilha +
   e-mail) com acesso ao Google da proprietária e ligar o endpoint do formulário.
6. Mensuração e Política de Privacidade permanecem como placeholders até a fase
   correspondente.
