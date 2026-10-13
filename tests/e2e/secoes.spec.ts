import { test, expect } from '@playwright/test';

test('CTA final aponta para o WhatsApp', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /fale com a presentear/i })).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\/5548991473599/,
  );
});
