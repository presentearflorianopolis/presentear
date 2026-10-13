import { test, expect } from '@playwright/test';

test('rodapé tem Instagram e WhatsApp, sem link de política ainda', async ({ page }) => {
  await page.goto('/');
  const f = page.locator('footer');
  await expect(f.getByRole('link', { name: /instagram/i })).toHaveAttribute(
    'href',
    /instagram\.com\/PresentearFlorianopolis/,
  );
  await expect(f.getByRole('link', { name: /whatsapp/i }).first()).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\/5548991473599/,
  );
  await expect(f.getByRole('link', { name: /pol[íi]tica/i })).toHaveCount(0);
});
