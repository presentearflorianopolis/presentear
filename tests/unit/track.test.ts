import { describe, it, expect } from 'vitest';
import { track } from '../../src/lib/track';

describe('track', () => {
  it('empurra para dataLayer quando existe', () => {
    (globalThis as unknown as { window: unknown }).window = { dataLayer: [] as unknown[] };
    track('cta_whatsapp', { local: 'hero' });
    const dl = (globalThis as unknown as { window: { dataLayer: unknown[] } }).window.dataLayer;
    expect(dl[0]).toMatchObject({ event: 'cta_whatsapp', local: 'hero' });
  });
  it('não quebra sem window', () => {
    delete (globalThis as unknown as { window?: unknown }).window;
    expect(() => track('envio_orcamento')).not.toThrow();
  });
});
