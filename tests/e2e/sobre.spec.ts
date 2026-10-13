import { test, expect } from '@playwright/test';

test('página sobre carrega com título próprio', async ({ page }) => {
  const res = await page.goto('/sobre');
  expect(res?.status()).toBeLessThan(400);
  await expect(
    page.getByRole('heading', { level: 1, name: /sobre a presentear/i }),
  ).toBeVisible();
});
