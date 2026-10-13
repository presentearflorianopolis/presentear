import type { APIRoute } from 'astro';
import { comBase } from '../lib/base';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(comBase('/sitemap-index.xml'), site);
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
