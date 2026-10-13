# Site Presentear — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o site de apresentação e geração de leads da Presentear (Florianópolis), mobile first, em Astro + Tailwind, sem loja virtual.

**Architecture:** Site estático (Astro SSG) com HTML leve e JS mínimo. Todo dado comercial e de conteúdo centralizado em `src/config` + `src/data` (tipado). Interatividade isolada em scripts de cliente pequenos: menu móvel, filtro do catálogo, reveal on scroll, validação do formulário. Conversão via links de WhatsApp pré-preenchidos e um formulário que faz POST para um endpoint configurável (Google Apps Script montado após a aprovação local).

**Tech Stack:** Astro ^7, TypeScript ^6, Tailwind CSS ^4 (via `@tailwindcss/vite`), fontes self-hosted (`@fontsource`), Vitest (unit), Playwright (e2e), `@astrojs/sitemap`, `@astrojs/check`. Conforme a skill `astro` (astrolicious/agent-skills): `src/pages` obrigatório; `src/components`/`src/layouts`/`src/styles`/`public` por convenção; definir `site` no `astro.config`; `astro check` e `astro sync` antes do build; nenhum adapter necessário para SSG puro (adapter só se houver renderização sob demanda).

**Spec:** `docs/superpowers/specs/2026-10-13-presentear-site-design.md`

## Global Constraints

- **Sem** carrinho, checkout, pagamento, conta de usuário ou fluxo de compra.
- **Nunca** inventar produtos, preços, avaliações, endereço, CNPJ, telefone ou história da empresa.
- **Nenhum preço** é exibido.
- Fotos reais ainda não existem: usar **placeholder elegante** onde faltar imagem; **nunca** subir imagem com marca-d'água de terceiros.
- WhatsApp oficial: `5548991473599` (exibição `+55 48 99147-3599`). Instagram: `@PresentearFlorianopolis`.
- Todos os dados comerciais/textos/mídias centralizados em `src/config/site.ts` e `src/data/*` — **nada** espalhado pelo código.
- Botões de contato usam sempre o mesmo destino configurável. Nenhum botão sem destino funcional; nenhum link quebrado.
- Formulário: nunca simular sucesso. Sem endpoint configurado → falha explícita + fallback de WhatsApp.
- Mobile first: desenvolver partindo de ~320px; **nenhuma rolagem horizontal involuntária**.
- Paleta: creme `#F5EFE5` (fundo), marrom institucional `#8B5E34` *(provisório — amostrar da logo quando o arquivo chegar)*, bege `#D5BFA2`, terracota `#B87556`, grafite `#292B24`, oliva `#35432C` (acento pontual).
- Tipografia: Cormorant Garamond (títulos), DM Sans (resto).
- Animações: `transform`/`opacity` + Intersection Observer, sem libs pesadas; respeitar `prefers-reduced-motion`; conteúdo acessível se a animação não rodar.
- SEO técnico básico, acessibilidade (foco visível, semântica, contraste AA), imagens otimizadas.
- Sem rastreadores de terceiros nesta fase; medição via camada neutra (`dataLayer`).

## Review Focus

1. **Links de WhatsApp:** o número e a mensagem devem sair corretos e URL-encoded (acentos/espaços). Um link errado não gera lead — sem erro visível no site.
2. **Telefone BR:** a máscara/validação deve aceitar formatos comuns (com e sem `+55`, 10 ou 11 dígitos) sem rejeitar números válidos.
3. **Rolagem horizontal em telas estreitas (~320px):** nenhum elemento pode estourar a largura.
4. **Falha do formulário:** erro de rede ou endpoint ausente **nunca** pode mostrar sucesso; deve mostrar erro claro + atalho de WhatsApp.
5. **`prefers-reduced-motion`:** com animações desligadas, todo o conteúdo continua visível (nada fica com `opacity: 0`).

---

### Task 1: Scaffold do projeto e ferramentas

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`, `.env.example`
- Create: `src/pages/index.astro` (placeholder mínimo para o build passar)
- Create: `tests/unit/smoke.test.ts`

**Interfaces:**
- Produces: scripts npm `dev`, `build`, `preview`, `check`, `test`, `test:e2e`.

- [ ] **Step 1: Criar o projeto Astro mínimo**

Rodar `npm create astro@latest . -- --template minimal --no-install --typescript strict --git` e depois `npm install`. Adicionar Tailwind: `npm install tailwindcss @tailwindcss/vite` e registrar `tailwindcss()` em `vite.plugins` no `astro.config.mjs`. Adicionar `npm install -D vitest @playwright/test @astrojs/check typescript` e `npx playwright install chromium`.

- [ ] **Step 2: Configurar `vitest.config.ts` e o script de teste**

`vitest.config.ts` com `test.include = ['tests/unit/**/*.test.ts']` e `environment: 'node'`.

- [ ] **Step 3: Escrever o teste de fumaça**

```ts
// tests/unit/smoke.test.ts
import { describe, it, expect } from 'vitest';
describe('smoke', () => { it('roda', () => { expect(1 + 1).toBe(2); }); });
```

- [ ] **Step 4: Rodar e verificar**

Run: `npm run build && npm run test`
Expected: build gera `dist/`; Vitest passa 1 teste.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold astro + tailwind + tests"
```

---

### Task 2: Tokens de design, fontes e layout base

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Modify: `astro.config.mjs` (definir `site`)
- Modify: `src/pages/index.astro`
- Create: `tests/e2e/layout.spec.ts`

**Interfaces:**
- Produces: `BaseLayout.astro` com props `{ title: string; description: string; canonicalPath?: string }`; classes utilitárias (`bg-cream`, `text-graphite`, `font-serif`, `font-sans`, `bg-institutional`).

- [ ] **Step 1: Instalar e importar as fontes self-hosted**

`npm install @fontsource/cormorant-garamond @fontsource/dm-sans`. Importar os pesos necessários no topo do `BaseLayout.astro`.

- [ ] **Step 2: Escrever `src/styles/global.css`**

Conteúdo: `@import "tailwindcss";` + bloco `@theme` com as cores (Global Constraints) e `--font-serif`/`--font-sans`, e um `:focus-visible` com contorno visível.

- [ ] **Step 3: Definir `site` no `astro.config.mjs`**

Adicionar `site: 'https://presentear.example.com'` (URL **placeholder** — `example.com` é reservado; substituir pelo domínio real depois; alimenta canonical e sitemap). Marcar com comentário `// TODO: domínio real`.

- [ ] **Step 4: Escrever o `BaseLayout.astro`**

`<html lang="pt-BR">`, `<head>` com `<title>`, `<meta name="description">`, viewport, `<link rel="canonical" href={new URL(canonicalPath ?? Astro.url.pathname, Astro.site)}>`, `<slot />`, e import do `global.css`. Sem JavaScript de terceiros.

- [ ] **Step 5: Escrever o teste e2e**

```ts
// tests/e2e/layout.spec.ts
import { test, expect } from '@playwright/test';
test('home tem lang pt-BR e título', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page).toHaveTitle(/Presentear/);
});
```

- [ ] **Step 6: Rodar e verificar**

Run: `npm run test:e2e -- tests/e2e/layout.spec.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: design tokens, fonts, base layout"
```

---

### Task 3: Configuração do site e dados

**Files:**
- Create: `src/config/site.ts`
- Create: `src/data/produtos.ts`, `src/data/categorias.ts`, `src/data/diferenciais.ts`
- Create: `src/data/index.ts`
- Create: `tests/unit/config.test.ts`

**Interfaces:**
- Produces:
  - `site: SiteConfig` — `{ name, tagline, mensagemPrincipal, mensagemComplementar, whatsapp, whatsappDisplay, instagram, instagramUrl, email, formEndpoint, textos }`.
  - `type Produto = { id: string; nome: string; descricao: string; categoriaId: string; etiqueta?: string; imagem: string | null; imagemAlt: string }`.
  - `type Categoria = { id: string; nome: string; imagem: string | null; imagemAlt: string }`.
  - `type Diferencial = { id: string; titulo: string; icone: string }`.
  - `produtos: Produto[]`, `categorias: Categoria[]`, `diferenciais: Diferencial[]`.
  - `site.formEndpoint` lê `import.meta.env.PUBLIC_FORM_ENDPOINT ?? ''`.

- [ ] **Step 1: Escrever o teste**

```ts
// tests/unit/config.test.ts
import { describe, it, expect } from 'vitest';
import { site } from '../../src/config/site';
import { produtos, categorias } from '../../src/data';

describe('config', () => {
  it('whatsapp é só dígitos E.164 BR', () => {
    expect(site.whatsapp).toBe('5548991473599');
    expect(/^\d+$/.test(site.whatsapp)).toBe(true);
  });
  it('cada produto referencia uma categoria existente', () => {
    const ids = new Set(categorias.map(c => c.id));
    for (const p of produtos) expect(ids.has(p.categoriaId)).toBe(true);
  });
  it('produtos não têm preço', () => {
    for (const p of produtos) expect('preco' in p).toBe(false);
  });
});
```

- [ ] **Step 2: Rodar e verificar que falha**

Run: `npm run test -- tests/unit/config.test.ts`
Expected: FAIL (módulo não encontrado).

- [ ] **Step 3: Implementar os arquivos de config/dados**

`site.ts` com os valores das Global Constraints. `categorias.ts` com as 5 ocasiões (Aniversário, Romântico, Agradecimento, Datas especiais, Presentes personalizados), `imagem: null`. `produtos.ts` com os 3 produtos (nomes provisórios claramente marcados em comentário), `imagem: null`, categorias conforme o design (§9). `diferenciais.ts` com os 4 itens do design. `.env.example` com `PUBLIC_FORM_ENDPOINT=`.

- [ ] **Step 4: Rodar e verificar**

Run: `npm run test -- tests/unit/config.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: site config and content data"
```

---

### Task 4: Biblioteca de WhatsApp

**Files:**
- Create: `src/lib/whatsapp.ts`
- Create: `tests/unit/whatsapp.test.ts`

**Interfaces:**
- Consumes: `site` (Task 3).
- Produces:
  - `buildWhatsAppUrl(message: string, phone?: string): string` → `https://wa.me/<phone-ou-site.whatsapp>?text=<encodeURIComponent(message)>`.
  - `buildProdutoMessage(nome: string): string`.
  - `buildProdutoUrl(nome: string): string`.

- [ ] **Step 1: Escrever o teste**

```ts
// tests/unit/whatsapp.test.ts
import { describe, it, expect } from 'vitest';
import { buildWhatsAppUrl, buildProdutoMessage, buildProdutoUrl } from '../../src/lib/whatsapp';

describe('whatsapp', () => {
  it('monta a URL com número e texto encodado', () => {
    const url = buildWhatsAppUrl('Olá! Presente?');
    expect(url.startsWith('https://wa.me/5548991473599?text=')).toBe(true);
    expect(url).toContain(encodeURIComponent('Olá! Presente?'));
  });
  it('mensagem de produto cita o nome', () => {
    expect(buildProdutoMessage('Cesta A')).toContain('Cesta A');
    expect(buildProdutoUrl('Cesta A')).toContain(encodeURIComponent('Cesta A'));
  });
});
```

- [ ] **Step 2: Rodar e verificar que falha** — Run: `npm run test -- tests/unit/whatsapp.test.ts` → FAIL.

- [ ] **Step 3: Implementar `src/lib/whatsapp.ts`**

Usar o template de mensagem por produto do design (§10.2). Fallback para `site.whatsapp` quando `phone` não vier.

- [ ] **Step 4: Rodar e verificar** — Run: `npm run test -- tests/unit/whatsapp.test.ts` → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: whatsapp link builder"
```

---

### Task 5: Máscara e validação de telefone BR

**Files:**
- Create: `src/lib/phone.ts`
- Create: `tests/unit/phone.test.ts`

**Interfaces:**
- Produces: `onlyDigits(s: string): string`; `maskPhoneBR(s: string): string` → `(48) 99147-3599`; `isValidPhoneBR(s: string): boolean` (aceita 10 ou 11 dígitos, com ou sem `+55`).

- [ ] **Step 1: Escrever o teste**

```ts
// tests/unit/phone.test.ts
import { describe, it, expect } from 'vitest';
import { maskPhoneBR, isValidPhoneBR } from '../../src/lib/phone';

describe('phone', () => {
  it('mascara 11 dígitos', () => { expect(maskPhoneBR('48991473599')).toBe('(48) 99147-3599'); });
  it('mascara 10 dígitos', () => { expect(maskPhoneBR('4833334444')).toBe('(48) 3333-4444'); });
  it('aceita com +55', () => { expect(isValidPhoneBR('+55 48 99147-3599')).toBe(true); });
  it('rejeita curto', () => { expect(isValidPhoneBR('123')).toBe(false); });
});
```

- [ ] **Step 2: Rodar e verificar que falha** → FAIL.

- [ ] **Step 3: Implementar `src/lib/phone.ts`** (remover `+55` inicial antes de contar os dígitos).

- [ ] **Step 4: Rodar e verificar** → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: brazilian phone mask and validation"
```

---

### Task 6: Validação e payload do formulário de orçamento

**Files:**
- Create: `src/lib/orcamento.ts`
- Create: `tests/unit/orcamento.test.ts`

**Interfaces:**
- Produces:
  - `type OrcamentoInput = { nome: string; whatsapp: string; ocasiao: string; data?: string; faixa?: string; descricao?: string }`.
  - `type OrcamentoPayload = { nome: string; whatsapp: string; ocasiao: string; data: string; faixa: string; descricao: string; origem: string }`.
  - `validateOrcamento(input: OrcamentoInput): { ok: boolean; errors: Partial<Record<keyof OrcamentoInput, string>> }` — exige `nome`, `whatsapp` válido, `ocasiao`.
  - `buildOrcamentoPayload(input: OrcamentoInput, origem: string): OrcamentoPayload`.

- [ ] **Step 1: Escrever o teste**

```ts
// tests/unit/orcamento.test.ts
import { describe, it, expect } from 'vitest';
import { validateOrcamento, buildOrcamentoPayload } from '../../src/lib/orcamento';

describe('orcamento', () => {
  it('exige nome, whatsapp válido e ocasião', () => {
    const r = validateOrcamento({ nome: '', whatsapp: '123', ocasiao: '' });
    expect(r.ok).toBe(false);
    expect(r.errors.nome).toBeTruthy();
    expect(r.errors.whatsapp).toBeTruthy();
    expect(r.errors.ocasiao).toBeTruthy();
  });
  it('aceita entrada válida', () => {
    const r = validateOrcamento({ nome: 'Ana', whatsapp: '48991473599', ocasiao: 'aniversario' });
    expect(r.ok).toBe(true);
  });
  it('normaliza opcionais ausentes', () => {
    const p = buildOrcamentoPayload({ nome: 'Ana', whatsapp: '48991473599', ocasiao: 'aniversario' }, 'home');
    expect(p.data).toBe(''); expect(p.descricao).toBe(''); expect(p.origem).toBe('home');
  });
});
```

- [ ] **Step 2: Rodar e verificar que falha** → FAIL.

- [ ] **Step 3: Implementar `src/lib/orcamento.ts`** (usa `isValidPhoneBR` da Task 5).

- [ ] **Step 4: Rodar e verificar** → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: quote form validation and payload"
```

---

### Task 7: Camada de eventos neutra

**Files:**
- Create: `src/lib/track.ts`
- Create: `tests/unit/track.test.ts`

**Interfaces:**
- Produces: `track(event: string, data?: Record<string, unknown>): void` — empurra para `window.dataLayer` quando existir; no-op (sem erro) caso contrário. `type EventName = 'cta_whatsapp' | 'clique_produto' | 'envio_orcamento' | 'categoria'`.

- [ ] **Step 1: Escrever o teste**

```ts
// tests/unit/track.test.ts
import { describe, it, expect, vi } from 'vitest';
import { track } from '../../src/lib/track';

describe('track', () => {
  it('empurra para dataLayer quando existe', () => {
    (globalThis as any).window = { dataLayer: [] as any[] };
    track('cta_whatsapp', { local: 'hero' });
    expect((globalThis as any).window.dataLayer[0]).toMatchObject({ event: 'cta_whatsapp', local: 'hero' });
  });
  it('não quebra sem window', () => {
    delete (globalThis as any).window;
    expect(() => track('envio_orcamento')).not.toThrow();
  });
});
```

- [ ] **Step 2: Rodar e verificar que falha** → FAIL.

- [ ] **Step 3: Implementar `src/lib/track.ts`** (checar `typeof window !== 'undefined'`).

- [ ] **Step 4: Rodar e verificar** → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: neutral analytics event layer"
```

---

### Task 8: Cabeçalho com menu móvel

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Logo.astro`
- Create: `tests/e2e/header.spec.ts`

**Interfaces:**
- Consumes: `site` (Task 3), `buildWhatsAppUrl` (Task 4).
- Produces: `<Header />` — links Início `/`, Presentes `/presentes`, Ocasiões `/presentes#ocasioes`, Personalize `/#personalize`, Sobre `/sobre`; botão WhatsApp. Sem ícone de sacola.

- [ ] **Step 1: Implementar `Logo.astro`**

Se `site` ainda não tem arquivo de logo, renderiza o **wordmark tipográfico** "Presentear" + "Florianópolis" em Cormorant (placeholder claramente marcado em comentário), pronto para trocar pela imagem real.

- [ ] **Step 2: Implementar `Header.astro`**

Header fixo; transparente com a página no topo e `bg-cream` após rolagem (classe via script pequeno com listener de scroll). No mobile: botão de menu com `aria-expanded`, painel que abre/fecha, fecha com Esc e clique fora, foco preso quando aberto.

- [ ] **Step 3: Escrever o teste e2e**

```ts
// tests/e2e/header.spec.ts
import { test, expect } from '@playwright/test';
test('menu móvel abre e fecha', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/');
  const btn = page.getByRole('button', { name: /menu/i });
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
  await btn.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
});
```

- [ ] **Step 4: Rodar e verificar** — Run: `npm run test:e2e -- tests/e2e/header.spec.ts` → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: header with accessible mobile menu"
```

---

### Task 9: Hero

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/PlaceholderImage.astro`
- Create: `tests/e2e/hero.spec.ts`

**Interfaces:**
- Consumes: `site` (Task 3), `buildWhatsAppUrl` (Task 4).
- Produces: `<Hero />` — título `site.mensagemPrincipal`, subtítulo complementar, CTA "ENCONTRE SEU PRESENTE" → `/presentes`.
- `PlaceholderImage.astro` props `{ alt: string; aspect?: string; label?: string; src?: string | null }` — se `src` nulo, mostra bloco creme/bege com rótulo discreto "Imagem pendente"; senão usa `astro:assets`.

- [ ] **Step 1: Implementar `PlaceholderImage.astro`**

- [ ] **Step 2: Implementar `Hero.astro`**

Composição editorial assimétrica; no mobile empilha título/CTA sobre imagem; no desktop layout assimétrico. CTA com `data-track="cta_whatsapp"` não se aplica (aqui é interno).

- [ ] **Step 3: Montar a home provisória** (`src/pages/index.astro` com `<BaseLayout><Header/><Hero/></BaseLayout>`).

- [ ] **Step 4: Escrever o teste e2e**

```ts
// tests/e2e/hero.spec.ts
import { test, expect } from '@playwright/test';
test('hero mostra a mensagem e o CTA de catálogo', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('momentos que ficam');
  await expect(page.getByRole('link', { name: /encontre seu presente/i })).toHaveAttribute('href', '/presentes');
});
```

- [ ] **Step 5: Rodar e verificar** → PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: hero with placeholder image"
```

---

### Task 10: Card de produto e grade "Escolhas que encantam"

**Files:**
- Create: `src/components/ProductCard.astro`
- Create: `src/components/SelecaoPresentes.astro`
- Create: `tests/e2e/produtos.spec.ts`

**Interfaces:**
- Consumes: `produtos` (Task 3), `buildProdutoUrl` (Task 4), `PlaceholderImage` (Task 9).
- Produces: `<ProductCard produto={Produto} />`, `<SelecaoPresentes />` — grade responsiva (1 coluna mobile → 3 desktop), título "Escolhas que encantam", botão "QUERO ESTE PRESENTE" → `buildProdutoUrl(p.nome)` com `target="_blank" rel="noopener"` e `data-track="clique_produto"`.

- [ ] **Step 1: Implementar `ProductCard.astro`**

Foto (placeholder), nome, descrição, etiqueta **só se `p.etiqueta` existir**, CTA WhatsApp. Hover: leve zoom + elevação (respeitando reduced-motion). Sem preço.

- [ ] **Step 2: Implementar `SelecaoPresentes.astro`** (usa `produtos`).

- [ ] **Step 3: Escrever o teste e2e**

```ts
// tests/e2e/produtos.spec.ts
import { test, expect } from '@playwright/test';
test('cada produto tem CTA de WhatsApp correto e sem preço', async ({ page }) => {
  await page.goto('/');
  const ctas = page.getByRole('link', { name: /quero este presente/i });
  await expect(ctas.first()).toHaveAttribute('href', /^https:\/\/wa\.me\/5548991473599\?text=/);
  await expect(page.getByText(/R\$\s?\d/)).toHaveCount(0);
});
```

- [ ] **Step 4: Rodar e verificar** → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: product card and featured grid"
```

---

### Task 11: Categorias por ocasião

**Files:**
- Create: `src/components/CategoryCard.astro`
- Create: `src/components/CategoriasOcasiao.astro`
- Create: `tests/e2e/categorias.spec.ts`

**Interfaces:**
- Consumes: `categorias` (Task 3), `PlaceholderImage` (Task 9).
- Produces: `<CategoriasOcasiao />` (id `ocasioes`) — título "Encontre o presente ideal"; cada `CategoryCard` linka para `/presentes?categoria=<id>`.

- [ ] **Step 1: Implementar `CategoryCard.astro`** (foto placeholder, nome, indicador discreto, hover/toque).

- [ ] **Step 2: Implementar `CategoriasOcasiao.astro`**.

- [ ] **Step 3: Escrever o teste e2e**

```ts
// tests/e2e/categorias.spec.ts
import { test, expect } from '@playwright/test';
test('cards de categoria linkam ao catálogo filtrado', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /anivers/i }).first())
    .toHaveAttribute('href', '/presentes?categoria=aniversario');
});
```

- [ ] **Step 4: Rodar e verificar** → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: occasion categories"
```

---

### Task 12: Faixa de diferenciais

**Files:**
- Create: `src/components/Diferenciais.astro`
- Create: `tests/e2e/diferenciais.spec.ts`

**Interfaces:**
- Consumes: `diferenciais` (Task 3).
- Produces: `<Diferenciais />` — faixa horizontal com 4 itens + ícones lineares; no mobile vira lista/2 colunas.

- [ ] **Step 1: Implementar `Diferenciais.astro`** (map de `diferenciais`; ícones como SVG inline mínimo por `id`).

- [ ] **Step 2: Escrever o teste e2e**

```ts
// tests/e2e/diferenciais.spec.ts
import { test, expect } from '@playwright/test';
test('mostra os quatro diferenciais', async ({ page }) => {
  await page.goto('/');
  const sec = page.locator('[data-section="diferenciais"]');
  await expect(sec.getByRole('listitem')).toHaveCount?.(4);
});
```

> Ajustar a asserção conforme a marcação final (o implementador escolhe `ul/li` ou `div`); o teste precisa afirmar **4 itens**.

- [ ] **Step 3: Rodar e verificar** → PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: differentiators strip"
```

---

### Task 13: Seções de personalização, sobre e CTA final

**Files:**
- Create: `src/components/Personalizacao.astro`
- Create: `src/components/SobreMarca.astro`
- Create: `src/components/CTAFinal.astro`
- Create: `tests/e2e/secoes.spec.ts`

**Interfaces:**
- Consumes: `site` (Task 3), `buildWhatsAppUrl` (Task 4), `PlaceholderImage` (Task 9).
- Produces: seções `#personalize`, `#sobre`, `#contato-final`.

- [ ] **Step 1: Implementar as três seções**

Personalização: fundo marrom institucional, título "Cada detalhe pode dizer muito.", texto e botão "PERSONALIZE SEU PRESENTE" → `/contato` (form) com `data-track`. Sobre: título + placeholder de texto (lorem marcado em comentário). CTA final: "Vamos transformar seu carinho em presente?" + "FALE COM A PRESENTEAR" → `buildWhatsAppUrl(...)`.

- [ ] **Step 2: Escrever o teste e2e**

```ts
// tests/e2e/secoes.spec.ts
import { test, expect } from '@playwright/test';
test('CTA final aponta para o WhatsApp', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /fale com a presentear/i }))
    .toHaveAttribute('href', /^https:\/\/wa\.me\/5548991473599/);
});
```

- [ ] **Step 3: Rodar e verificar** → PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: personalization, about and final CTA sections"
```

---

### Task 14: Rodapé

**Files:**
- Create: `src/components/Footer.astro`
- Create: `tests/e2e/footer.spec.ts`

**Interfaces:**
- Consumes: `site` (Task 3), `buildWhatsAppUrl` (Task 4), `Logo` (Task 8).
- Produces: `<Footer />` — logo, frase institucional, links de navegação, Instagram (`site.instagramUrl`), WhatsApp, contato. **Sem** endereço/CNPJ/telefone inventados. Link de Política de Privacidade **não** aparece nesta fase.

- [ ] **Step 1: Implementar `Footer.astro`**.

- [ ] **Step 2: Escrever o teste e2e**

```ts
// tests/e2e/footer.spec.ts
import { test, expect } from '@playwright/test';
test('rodapé tem Instagram e WhatsApp, sem link de política ainda', async ({ page }) => {
  await page.goto('/');
  const f = page.locator('footer');
  await expect(f.getByRole('link', { name: /instagram/i })).toHaveAttribute('href', /instagram\.com\/PresentearFlorianopolis/);
  await expect(f.getByRole('link', { name: /pol[íi]tica/i })).toHaveCount(0);
});
```

- [ ] **Step 3: Rodar e verificar** → PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: footer"
```

---

### Task 15: Montagem completa da homepage

**Files:**
- Modify: `src/pages/index.astro`
- Create: `tests/e2e/home.spec.ts`
- Create: `tests/e2e/mobile.spec.ts`

**Interfaces:**
- Consumes: todos os componentes das Tasks 8–14.
- Produces: home com a ordem do design (§8): Header, Hero, Diferenciais, Categorias, Seleção, Personalização, Sobre, CTA final, Footer.

- [ ] **Step 1: Compor a home** na ordem do design, com `BaseLayout` e metadados próprios.

- [ ] **Step 2: Escrever os testes e2e**

```ts
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';
test('home tem as seções principais', async ({ page }) => {
  await page.goto('/');
  for (const h of [/momentos que ficam/i, /encontre o presente ideal/i, /escolhas que encantam/i, /cada detalhe pode dizer muito/i]) {
    await expect(page.getByRole('heading', { name: h })).toBeVisible();
  }
});
```

```ts
// tests/e2e/mobile.spec.ts
import { test, expect } from '@playwright/test';
test('sem rolagem horizontal a 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
```

- [ ] **Step 3: Rodar e verificar** — Run: `npm run test:e2e` → PASS (todos).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: assemble full homepage"
```

---

### Task 16: Página de catálogo com filtro

**Files:**
- Create: `src/pages/presentes.astro`
- Create: `src/scripts/filtro.ts`
- Create: `tests/e2e/catalogo.spec.ts`

**Interfaces:**
- Consumes: `produtos`, `categorias` (Task 3), `ProductCard` (Task 10).
- Produces: `/presentes` com grade completa, filtro por `?categoria=<id>` e botões de filtro; `filtro.ts` lê o querystring, marca o filtro ativo e mostra/esconde cards (via `data-categoria`), atualizando a URL sem recarregar.

- [ ] **Step 1: Implementar `presentes.astro`** (renderiza todos os cards com `data-categoria`; barra de filtros com todas as categorias + "Todos"; estados vazio/erro).

- [ ] **Step 2: Implementar `src/scripts/filtro.ts`** (client script; atualiza `history.replaceState`; dispara `track('categoria', ...)`).

- [ ] **Step 3: Escrever o teste e2e**

```ts
// tests/e2e/catalogo.spec.ts
import { test, expect } from '@playwright/test';
test('filtro por categoria esconde os demais', async ({ page }) => {
  await page.goto('/presentes?categoria=aniversario');
  const cards = page.locator('[data-categoria]:visible');
  for (const el of await page.locator('[data-categoria]').all()) {
    if (await el.isVisible()) expect(await el.getAttribute('data-categoria')).toBe('aniversario');
  }
  expect(await cards.count()).toBeGreaterThan(0);
});
```

- [ ] **Step 4: Rodar e verificar** → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: catalog page with occasion filter"
```

---

### Task 17: Formulário de orçamento e página de contato

**Files:**
- Create: `src/components/OrcamentoForm.astro`
- Create: `src/scripts/orcamento.ts`
- Create: `src/pages/contato.astro`
- Create: `tests/e2e/orcamento.spec.ts`

**Interfaces:**
- Consumes: `validateOrcamento`, `buildOrcamentoPayload` (Task 6), `maskPhoneBR` (Task 5), `site.formEndpoint` (Task 3), `buildWhatsAppUrl` (Task 4), `track` (Task 7).
- Produces: `/contato` com o formulário; campos nome, whatsapp, ocasião, data, faixa, descrição, **honeypot** oculto. Estados: idle → sending → sucesso (só com resposta OK) / erro (com link de WhatsApp). Se `site.formEndpoint` vazio → erro configurado ("canal em configuração") + WhatsApp, **sem** simular envio.

- [ ] **Step 1: Implementar `OrcamentoForm.astro`** (HTML acessível: `label`s, `aria-invalid`, mensagens de erro por campo, `novalidate` para controlar a validação).

- [ ] **Step 2: Implementar `src/scripts/orcamento.ts`**

Intercepta submit, aplica `maskPhoneBR` no input, roda `validateOrcamento`, mostra erros, e faz `fetch(site.formEndpoint, { method: 'POST', ... })`. Se endpoint vazio → erro imediato. Só mostra sucesso quando `res.ok`. Em qualquer falha → erro + link de WhatsApp pré-preenchido com os dados. Dispara `track('envio_orcamento')` no sucesso.

- [ ] **Step 3: Implementar `src/pages/contato.astro`**.

- [ ] **Step 4: Escrever o teste e2e**

```ts
// tests/e2e/orcamento.spec.ts
import { test, expect } from '@playwright/test';
test('não envia com campos inválidos', async ({ page }) => {
  await page.goto('/contato');
  await page.getByRole('button', { name: /enviar/i }).click();
  await expect(page.getByText(/informe seu nome/i)).toBeVisible();
});
test('sem endpoint configurado mostra erro e WhatsApp, nunca sucesso', async ({ page }) => {
  await page.goto('/contato');
  await page.getByLabel(/nome/i).fill('Ana');
  await page.getByLabel(/whatsapp/i).fill('48991473599');
  await page.getByLabel(/ocasi/i).selectOption({ index: 1 });
  await page.getByRole('button', { name: /enviar/i }).click();
  await expect(page.getByText(/configura|indispon|erro/i).first()).toBeVisible();
  await expect(page.getByText(/recebemos|sucesso|enviado com/i)).toHaveCount(0);
});
```

- [ ] **Step 5: Rodar e verificar** → PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: quote form and contact page"
```

---

### Task 18: Página Sobre

**Files:**
- Create: `src/pages/sobre.astro`
- Create: `tests/e2e/sobre.spec.ts`

**Interfaces:**
- Consumes: `site` (Task 3), `PlaceholderImage` (Task 9).
- Produces: `/sobre` com apresentação da marca; texto real pendente (placeholder marcado), sem história inventada.

- [ ] **Step 1: Implementar `sobre.astro`** com meta própria.

- [ ] **Step 2: Escrever o teste e2e**

```ts
// tests/e2e/sobre.spec.ts
import { test, expect } from '@playwright/test';
test('página sobre carrega com título', async ({ page }) => {
  await page.goto('/sobre');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
```

- [ ] **Step 3: Rodar e verificar** → PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: about page"
```

---

### Task 19: Animações de entrada e rolagem

**Files:**
- Create: `src/scripts/reveal.ts`
- Modify: `src/layouts/BaseLayout.astro` (carrega o script)
- Modify: `src/styles/global.css` (classes `[data-reveal]` + `@media (prefers-reduced-motion: reduce)`)
- Create: `tests/e2e/reveal.spec.ts`

**Interfaces:**
- Produces: elementos com `data-reveal` recebem a classe de entrada quando entram na viewport (Intersection Observer, `once`). Sequência de entrada do hero (título → subtítulo → botão → imagem) via delays por `data-reveal-delay`.

- [ ] **Step 1: Implementar `reveal.ts`**

Um `IntersectionObserver` marca `data-reveal="visible"` ao entrar. Se não houver suporte, adiciona a todos imediatamente.

- [ ] **Step 2: Implementar CSS**

Estado inicial (`opacity:0; translateY(...)`) **apenas** sob `@media (prefers-reduced-motion: no-preference)` — garantindo o Review Focus 5.

- [ ] **Step 3: Escrever o teste e2e**

```ts
// tests/e2e/reveal.spec.ts
import { test, expect } from '@playwright/test';
test('conteúdo visível com movimento reduzido', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: /escolhas que encantam/i })).toBeVisible();
  await ctx.close();
});
```

- [ ] **Step 4: Rodar e verificar** → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: scroll reveal animations with reduced-motion support"
```

---

### Task 20: SEO, metadados, sitemap e acessibilidade

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (OG/Twitter tags, JSON-LD `Organization`)
- Create: `src/pages/robots.txt.ts`
- Modify: `astro.config.mjs` (`@astrojs/sitemap`; `site` já definido na Task 2 e usado no sitemap/canonical)
- Create: `tests/e2e/a11y.spec.ts`

**Interfaces:**
- Consumes: `site` (Task 3).
- Produces: títulos/descriptions por página; `sitemap-index.xml`; `Organization`/`LocalBusiness` JSON-LD (só com dados reais — sem endereço inventado); foco visível em todos os interativos.

- [ ] **Step 1: Adicionar sitemap e robots** (`npm install @astrojs/sitemap`).

- [ ] **Step 2: Adicionar metadados OG/Twitter e JSON-LD** no `BaseLayout`, com `site.url` placeholder configurável.

- [ ] **Step 3: Escrever o teste e2e**

```ts
// tests/e2e/a11y.spec.ts
import { test, expect } from '@playwright/test';
test('cada página tem um h1 e descrição', async ({ page }) => {
  for (const path of ['/', '/presentes', '/contato', '/sobre']) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  }
});
```

- [ ] **Step 4: Rodar e verificar** → PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: seo metadata, sitemap and accessibility checks"
```

---

### Task 21: Preparação de deploy e documentação

**Files:**
- Create: `vercel.json` (opcional). **Não** adicionar adapter `@astrojs/vercel`: o site é SSG puro (formulário envia por `fetch` client-side para o Apps Script), então não há renderização sob demanda.
- Create: `README.md`
- Modify: `.env.example`

**Interfaces:**
- Produces: build estático em `dist/` pronto para Vercel; `README` com passos de dev, build, env e os pendentes (logo, fotos, e-mail, Apps Script, mensuração).

- [ ] **Step 1: Verificar build de produção (workflow da skill `astro`)**

Run: `npx astro sync && npm run check && npm run build`
Expected: `check` sem erros de tipo; `build` gera `dist/` — conferir que `dist/` existe e **não está vazio** (`ls dist | wc -l` > 0).

- [ ] **Step 2: Escrever o `README.md`** com: requisitos, comandos, variáveis (`PUBLIC_FORM_ENDPOINT`), estrutura de pastas, e a lista de pendências/§17 do design.

- [ ] **Step 3: Rodar a suíte completa**

Run: `npm run check && npm run test && npm run test:e2e`
Expected: tudo verde.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: deploy prep and docs"
```

---

## Self-Review

**1. Cobertura do spec:** Homepage §8 (Tasks 8–15), catálogo §9 (Task 16), formulário/leads §10 (Tasks 5–7, 17), animações §11 (Tasks 10, 19), responsividade §12 (Tasks 15, 16, 20), stack/estrutura §13 (Tasks 1–3), critérios §14 (diversas), pendências §15 (README, Task 21). Política de Privacidade: deliberadamente **fora** até o texto real (decisão §7 do design) — não há task, o que é intencional.

**2. Step scan:** cada passo tem uma ação + resultado checável; corpos de componente não são transcritos, só assinaturas e comportamento.

**3. Type consistency:** `Produto`/`Categoria`/`Diferencial` definidos na Task 3 e consumidos literalmente nas Tasks 10–12, 16; `buildProdutoUrl`/`buildWhatsAppUrl` (Task 4), `isValidPhoneBR` (Task 5), `validateOrcamento`/`buildOrcamentoPayload` (Task 6), `track` (Task 7) usados com a mesma assinatura adiante.

**4. Review Focus:** (1) WhatsApp → Tasks 4, 10, 13, 14; (2) telefone BR → Task 5; (3) sem rolagem horizontal a 320px → Task 15; (4) falha do formulário → Task 17; (5) reduced-motion → Task 19.

**5. Proportion:** plano guiado por assinaturas e testes; sem transcrição de implementação.
