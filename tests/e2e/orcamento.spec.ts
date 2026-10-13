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

test('fallback de WhatsApp já vem preenchido com os dados digitados', async ({ page }) => {
  await page.goto('/contato');
  await page.getByLabel(/nome/i).fill('Ana Souza');
  await page.getByLabel(/whatsapp/i).fill('48991473599');
  await page.getByLabel(/ocasi/i).selectOption({ index: 1 });
  await page.getByLabel(/conte/i).fill('Cesta de aniversário');
  await page.getByRole('button', { name: /enviar/i }).click();

  const link = page.locator('#form-orcamento').getByRole('link', { name: /whatsapp/i });
  await expect(link).toBeVisible();
  const mensagem = decodeURIComponent((await link.getAttribute('href')) ?? '');
  expect(mensagem).toContain('Ana Souza');
  expect(mensagem).toContain('99147-3599');
});
