import { test, expect } from '@playwright/test';

const injetaDataLayer = () => {
  (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
};

test('clique no CTA de WhatsApp emite evento', async ({ page }) => {
  await page.addInitScript(injetaDataLayer);
  await page.goto('./');
  await page.locator('header').getByRole('link', { name: /whatsapp/i }).click();
  const eventos = await page.evaluate(
    () => (window as unknown as { dataLayer: { event: string }[] }).dataLayer,
  );
  expect(eventos.some((e) => e.event === 'cta_whatsapp')).toBe(true);
});

test('clique por produto emite evento', async ({ page }) => {
  await page.addInitScript(injetaDataLayer);
  await page.goto('./');
  await page.getByRole('link', { name: /quero este presente/i }).first().click();
  const eventos = await page.evaluate(
    () => (window as unknown as { dataLayer: { event: string }[] }).dataLayer,
  );
  expect(eventos.some((e) => e.event === 'clique_produto')).toBe(true);
});
