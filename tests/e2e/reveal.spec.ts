import { test, expect } from '@playwright/test';

test('conteúdo visível com movimento reduzido', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: /escolhas que encantam/i })).toBeVisible();

  // O sistema de reveal precisa existir...
  const reveals = page.locator('[data-reveal]');
  expect(await reveals.count()).toBeGreaterThan(0);

  // ...e não pode deixar nada invisível para quem pediu menos movimento.
  const comOpacidadeZero = await reveals.evaluateAll(
    (els) => els.filter((el) => getComputedStyle(el).opacity === '0').length,
  );
  expect(comOpacidadeZero).toBe(0);

  await ctx.close();
});
