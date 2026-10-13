// Despacha os eventos de medição declarados via `data-track` em qualquer elemento.
// Progressive enhancement: sem `window.dataLayer`, `track()` é no-op.
import { track, type EventName } from '../lib/track';

document.addEventListener(
  'click',
  (event) => {
    const el = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
    const name = el?.dataset.track as EventName | undefined;
    if (!name) return;
    track(name, { href: el?.getAttribute('href') ?? undefined });
  },
  { capture: true },
);
