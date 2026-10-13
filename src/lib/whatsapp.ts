import { site } from '../config/site';

/** Monta um link wa.me com a mensagem URL-encoded para o número informado (ou o oficial). */
export function buildWhatsAppUrl(message: string, phone: string = site.whatsapp): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Mensagem inicial padrão quando o contato parte de um produto (§10.2 do design). */
export function buildProdutoMessage(nome: string): string {
  return `Olá! Conheci a Presentear pelo site e gostaria de saber mais sobre o produto ${nome}. Poderiam me passar as informações, disponibilidade e opções de personalização?`;
}

/** Link de WhatsApp já preenchido com o nome do produto. */
export function buildProdutoUrl(nome: string): string {
  return buildWhatsAppUrl(buildProdutoMessage(nome));
}
