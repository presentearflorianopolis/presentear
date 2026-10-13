# Presentear — site de apresentação e geração de leads

Site da **Presentear** (Florianópolis): apresenta as cestas de presente e converte
visitantes em contatos por **WhatsApp** e **formulário de orçamento**. Não é loja
virtual — sem carrinho, checkout ou pagamento.

- **Design:** [`docs/superpowers/specs/2026-10-13-presentear-site-design.md`](docs/superpowers/specs/2026-10-13-presentear-site-design.md)
- **Plano de implementação:** [`docs/superpowers/plans/2026-10-13-site-presentear.md`](docs/superpowers/plans/2026-10-13-site-presentear.md)
- **Briefing original:** [`task.md`](task.md)

## Requisitos

- Node.js 20+ (desenvolvido com Node 24)
- npm

## Comandos

```bash
npm install            # dependências
npm run dev            # servidor de desenvolvimento (http://localhost:4321)
npm run build          # build estático em dist/
npm run preview        # pré-visualiza o build
npm run check          # astro check (tipos/config)
npm run test           # testes unitários (Vitest)
npm run test:e2e       # testes end-to-end (Playwright)
```

Primeira vez que roda e2e: `npx playwright install chromium`.

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha conforme disponível:

| Variável | Descrição |
|---|---|
| `PUBLIC_FORM_ENDPOINT` | URL do Web App do Google Apps Script que recebe o formulário. **Vazio** até o endpoint real ser publicado — nesse caso o site mostra erro + atalho de WhatsApp (nunca sucesso falso). |

O `site` (domínio) fica no `astro.config.mjs` e alimenta canonical/sitemap. Hoje é
um **placeholder** (`https://presentear.example.com`) — substituir pelo domínio real.

## Estrutura

```
src/
  config/site.ts        # WhatsApp, Instagram, textos, e-mail, endpoint do formulário
  data/                 # produtos, diferenciais
  assets/               # logo (fundo transparente) e fotos dos produtos
  lib/                  # whatsapp, phone (máscara BR), orcamento (validação), track
  scripts/              # formulário, reveal on scroll, tracking
  components/           # Header, Footer, Hero, ProductCard, OrcamentoForm, ...
  layouts/BaseLayout.astro
  pages/                # index, presentes, presentes/[id], contato, sobre, robots.txt
  styles/global.css     # tokens de design (Tailwind v4 @theme)
public/
  favicon.png           # ícone do site (gerado da logo)
  og-image.png          # imagem de compartilhamento (Open Graph)
```

**Tudo configurável vive em `src/config` e `src/data`** — nenhum telefone, link ou
dado comercial espalhado pelo código.

## Integrações e dados que ainda dependem da proprietária

Ver §15 e §17 do documento de design. Resumo:

- **Fotos reais** dos produtos: hoje o site usa **temporariamente** as imagens de
  referência fornecidas. Elas têm marca-d'água de outra marca ("Par Tuu Receber") e
  o selo "Imagem ilustrativa" — precisam ser trocadas pelas fotos próprias da
  Presentear (substituir os arquivos em `src/assets/produtos/`).
- **Fotos extras** das caixas: as 3 fotos enviadas pela proprietária (uma por caixa)
  já aparecem nas páginas internas, junto da capa (`src/assets/produtos/caixa-*-2.*`).
- **Texto do "Sobre"** (hoje placeholder).
- **Nomes/descrições finais** das caixas (provisórios). A descrição longa de cada
  caixa aparece na página interna (`/presentes/<id>`) já marcada como "em preparação".
- **Logo**: já integrada a partir do arquivo fornecido, com o fundo branco removido
  (arte intacta) em `src/assets/logo.png`; favicon e imagem de compartilhamento
  gerados a partir dela. Faltam: versão editável (SVG) e amostrar o marrom exato
  (a logo usa ~`#784800`; o token `--color-institutional` ainda é `#8B5E34`).
- **Google Apps Script** (planilha + e-mail): montado **após aprovação local**, com
  acesso ao Google da proprietária. Define `PUBLIC_FORM_ENDPOINT`.
- **E-mail de destino** dos leads.
- **Mensuração:** camada neutra com `dataLayer`; provedor a definir.
- **Informações comerciais** do rodapé (só se existirem).
- **Política de Privacidade:** rota/link só entram quando houver texto real.

## Deploy

Site **estático** (SSG). Sem adapter — publicar `dist/` na Vercel (o formulário é
enviado por `fetch` no cliente para o Apps Script). Passos: `npx astro sync &&
npm run check && npm run build`, conferir que `dist/` está preenchido e publicar.
Repositório no GitHub e deploy na Vercel são feitos após a aprovação local.
