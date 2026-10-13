// Reveal on scroll com IntersectionObserver — leve, sem bibliotecas.
// Progressive enhancement: sem JS (ou sem suporte), o conteúdo permanece visível.

const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

const revelarTudo = (): void => {
  elements.forEach((el) => el.setAttribute('data-reveal', 'visible'));
};

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduzMovimento || !('IntersectionObserver' in window)) {
  revelarTudo();
} else {
  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.revealDelay ?? '0');
        el.style.transitionDelay = `${Number.isFinite(delay) ? delay : 0}ms`;
        el.setAttribute('data-reveal', 'visible');
        observer.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  elements.forEach((el) => observer.observe(el));
}
