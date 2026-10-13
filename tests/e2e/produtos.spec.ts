import { test, expect } from '@playwright/test';

test('cada produto tem CTA de WhatsApp correto e sem preço', async ({ page }) => {
  await page.goto('/');
  const ctas = page.getByRole('link', { name: /quero este presente/i });
  await expect(ctas.first()).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\/5548991473599\?text=/,
  );
  await expect(page.getByText(/R\$\s?\d/)).toHaveCount(0);
});
