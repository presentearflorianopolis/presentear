import { test, expect } from '@playwright/test';

test('home tem as seções principais', async ({ page }) => {
  await page.goto('/');
  for (const h of [
    /momentos que ficam/i,
    /encontre o presente ideal/i,
    /escolhas que encantam/i,
    /cada detalhe pode dizer muito/i,
  ]) {
    await expect(page.getByRole('heading', { name: h })).toBeVisible();
  }
});
