import { site } from '../config/site';
import { validateOrcamento, buildOrcamentoPayload } from '../lib/orcamento';
import { maskPhoneBR } from '../lib/phone';
import { track } from '../lib/track';

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const form = document.getElementById('form-orcamento') as HTMLFormElement | null;

if (form) {
  const status = document.getElementById('status');
  const waFallback = document.getElementById('wa-fallback') as HTMLAnchorElement | null;
  const campos = ['nome', 'whatsapp', 'ocasiao', 'data', 'faixa', 'descricao'] as const;

  const get = (name: string): Field | null =>
    form.elements.namedItem(name) as Field | null;
  const value = (name: string): string => get(name)?.value ?? '';

  const showError = (name: string, message?: string): void => {
    const p = document.getElementById(`erro-${name}`);
    if (p) {
      p.textContent = message ?? '';
      p.hidden = !message;
    }
    get(name)?.setAttribute('aria-invalid', message ? 'true' : 'false');
  };

  const falhar = (mensagem: string): void => {
    if (status) status.textContent = mensagem;
    if (waFallback) waFallback.hidden = false;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (waFallback) waFallback.hidden = true;

    const input = {
      nome: value('nome'),
      whatsapp: value('whatsapp'),
      ocasiao: value('ocasiao'),
      data: value('data'),
      faixa: value('faixa'),
      descricao: value('descricao'),
    };

    const { ok, errors } = validateOrcamento(input);
    campos.forEach((c) => showError(c, errors[c as keyof typeof errors]));
    if (!ok) return;

    // Honeypot preenchido = bot.
    if (value('empresa')) return;

    const payload = buildOrcamentoPayload(input, 'contato');

    // Endpoint ainda não configurado (Apps Script montado após aprovação local).
    // Nunca simular sucesso.
    if (!site.formEndpoint) {
      falhar(
        'Não foi possível enviar agora — o canal de orçamento está em configuração. Fale com a gente pelo WhatsApp.',
      );
      return;
    }

    if (status) status.textContent = 'Enviando…';
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      if (status) status.textContent = 'Recebemos seu pedido! Vamos responder pelo WhatsApp.';
      form.reset();
      track('envio_orcamento', { ocasiao: payload.ocasiao });
    } catch {
      falhar(
        'Não conseguimos enviar seu pedido agora. Tente novamente ou fale com a gente pelo WhatsApp.',
      );
    }
  });

  const tel = get('whatsapp') as HTMLInputElement | null;
  tel?.addEventListener('input', () => {
    tel.value = maskPhoneBR(tel.value);
  });
}
