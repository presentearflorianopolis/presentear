import { test, expect } from '@playwright/test';

test('filtro por categoria esconde os demais', async ({ page }) => {
  await page.goto('/presentes?categoria=aniversario');
  const cards = page.locator('[data-categoria]:visible');
  for (const el of await page.locator('[data-categoria]').all()) {
    if (await el.isVisible()) {
      expect(await el.getAttribute('data-categoria')).toBe('aniversario');
    }
  }
  expect(await cards.count()).toBeGreaterThan(0);
});
