/** Mantém apenas os dígitos. */
export function onlyDigits(s: string): string {
  return (s ?? '').replace(/\D/g, '');
}

/** Remove o código do país (55) quando presente e retorna só DDD + número. */
function nationalDigits(s: string): string {
  let d = onlyDigits(s);
  if (d.startsWith('55') && d.length >= 12) d = d.slice(2);
  return d;
}

/** Formata como (DD) XXXXX-XXXX (celular) ou (DD) XXXX-XXXX (fixo). */
export function maskPhoneBR(s: string): string {
  const d = nationalDigits(s).slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  if (rest.length <= 4) return `(${ddd}) ${rest}`;
  if (rest.length <= 8) return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5, 9)}`;
}

/** Válido quando restam 10 (fixo) ou 11 (celular) dígitos nacionais. */
export function isValidPhoneBR(s: string): boolean {
  const d = nationalDigits(s);
  return d.length === 10 || d.length === 11;
}
