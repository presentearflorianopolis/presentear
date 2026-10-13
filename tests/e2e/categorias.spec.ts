import { test, expect } from '@playwright/test';

test('cards de categoria linkam ao catálogo filtrado', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /anivers/i }).first()).toHaveAttribute(
    'href',
    '/presentes?categoria=aniversario',
  );
});
