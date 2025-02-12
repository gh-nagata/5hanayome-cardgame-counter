import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/5hanayome-cardgame-counter/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '五等分の花嫁カードゲームカウンター',
        short_name: 'ごとカドカウンター',
        description: 'This is a PWA application built with Vite and React.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: "landscape", // ここを追加
        icons: [
          {
            src: '/5hanayome-cardgame-counter/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/5hanayome-cardgame-counter/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
