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
