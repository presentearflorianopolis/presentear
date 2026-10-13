import { test, expect } from '@playwright/test';

test('mostra os quatro diferenciais', async ({ page }) => {
  await page.goto('/');
  const sec = page.locator('[data-section="diferenciais"]');
  await expect(sec.getByRole('listitem')).toHaveCount(4);
});
