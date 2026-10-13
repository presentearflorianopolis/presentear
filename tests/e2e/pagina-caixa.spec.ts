import { test, expect } from '@playwright/test';

const caixas = [
  {
    id: 'caixa-presente',
    nome: /caixa presente/i,
    capa: /caixa de madeira com espumante/i,
    extra: /café da manhã com laço dourado/i,
  },
  {
    id: 'caixa-sossego',
    nome: /caixa sossego/i,
    capa: /caneca personalizada/i,
    extra: /celofane com laço vermelho/i,
  },
  {
    id: 'caixa-bolo',
    nome: /caixa com bolo/i,
    capa: /balões coloridos/i,
    extra: /chocolates e doces com laço vermelho/i,
  },
];

test('cada caixa da home tem um "Saiba mais" para a própria página', async ({ page }) => {
  await page.goto('/');
  for (const { id } of caixas) {
    await expect(
      page.locator(`[data-produto="${id}"]`).getByRole('link', { name: /saiba mais/i }),
    ).toHaveAttribute('href', `/presentes/${id}`);
  }
});

for (const { id, nome, capa, extra } of caixas) {
  test(`página interna de ${id} mostra descrição, capa, foto extra e WhatsApp`, async ({ page }) => {
    const res = await page.goto(`/presentes/${id}`);
    expect(res?.status()).toBeLessThan(400);

    await expect(page.getByRole('heading', { level: 1, name: nome })).toBeVisible();
    await expect(page.getByText(/em prepara/i)).toBeVisible();
    await expect(page.getByAltText(capa)).toBeVisible();
    await expect(page.getByAltText(extra)).toBeVisible();

    await expect(page.getByRole('link', { name: /quero este presente/i })).toHaveAttribute(
      'href',
      /^https:\/\/wa\.me\/5548991473599\?text=/,
    );
    await expect(page.getByRole('link', { name: /todas as caixas/i })).toHaveAttribute(
      'href',
      '/presentes',
    );
  });
}
