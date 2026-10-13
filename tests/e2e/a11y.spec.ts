import { test, expect } from '@playwright/test';

const paginas = ['/', '/presentes', '/contato', '/sobre'];

test('cada página tem um h1 e descrição', async ({ page }) => {
  for (const path of paginas) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{20,}/);
  }
});

test('cada página tem Open Graph, Twitter card e canonical', async ({ page }) => {
  for (const path of paginas) {
    await page.goto(path);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  }
});

test('robots.txt aponta o sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt');
  expect(res.ok()).toBeTruthy();
  const body = await res.text();
  expect(body).toMatch(/Sitemap:/i);
});
