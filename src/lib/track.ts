export type EventName =
  | 'cta_whatsapp'
  | 'cta_personalize'
  | 'clique_produto'
  | 'saiba_mais'
  | 'envio_orcamento';

/**
 * Camada de eventos neutra: empurra para `window.dataLayer` quando existir.
 * Nenhum provedor de terceiros é carregado nesta fase; no-op caso não exista.
 */
export function track(event: EventName, data?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  if (!Array.isArray(w.dataLayer)) return;
  w.dataLayer.push({ event, ...data });
}
