import { test, expect } from '@playwright/test';
import { BASE } from './base';

test('hero mostra a mensagem e o CTA de catálogo', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('momentos que ficam');
  await expect(page.getByRole('link', { name: /encontre seu presente/i })).toHaveAttribute(
    'href',
    `${BASE}/presentes`,
  );
});
