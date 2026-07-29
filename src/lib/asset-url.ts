/**
 * Lovable CDN assets are served from the Lovable origin.
 * When the app is hosted elsewhere (e.g. Vercel), the relative
 * `/__l5e/...` path 404s — so we always resolve to the absolute CDN origin.
 */
const CDN_ORIGIN = "https://saadhabib.lovable.app";

export function assetUrl(asset: { url: string }): string {
  if (/^https?:\/\//.test(asset.url)) return asset.url;
  return `${CDN_ORIGIN}${asset.url}`;
}
