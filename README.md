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
  data/                 # produtos, categorias (ocasiões), diferenciais
  lib/                  # whatsapp, phone (máscara BR), orcamento (validação), track
  scripts/              # filtro do catálogo, formulário, reveal on scroll
  components/           # Header, Footer, Hero, ProductCard, OrcamentoForm, ...
  layouts/BaseLayout.astro
  pages/                # index, presentes, contato, sobre, robots.txt
  styles/global.css     # tokens de design (Tailwind v4 @theme)
```

**Tudo configurável vive em `src/config` e `src/data`** — nenhum telefone, link ou
dado comercial espalhado pelo código.

## Integrações e dados que ainda dependem da proprietária

Ver §15 e §17 do documento de design. Resumo:

- **Fotos reais** dos produtos (hoje há placeholders; as referências tinham
  marca-d'água de terceiros e não podem ir ao ar).
- **Texto do "Sobre"** (hoje placeholder).
- **Nomes/descrições finais** dos produtos (provisórios).
- **Arquivo da logo** em alta/transparente (hoje há um wordmark tipográfico provisório;
  o marrom `#8B5E34` também é provisório até amostrar da logo).
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
