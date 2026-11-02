import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'నేటి భారతం న్యూస్ (Neti Bharatham News)',
    short_name: 'నేటిభారతం',
    description: 'తెలుగు, హిందీ, ఇంగ్లీష్ లో నేషనల్, స్టేట్, జిల్లా మరియు మండల వార్తలు, వీడియో బులెటిన్లు',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#7f1d1d',
    theme_color: '#b91c1c',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
