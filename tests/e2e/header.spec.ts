import { test, expect } from '@playwright/test';

test('menu móvel abre e fecha', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('./');
  const btn = page.getByRole('button', { name: /menu/i });
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
  await btn.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
});
