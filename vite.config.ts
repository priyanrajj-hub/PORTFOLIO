import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const geminiKey =
    process.env.GEMINI_API_KEY ||
    env.GEMINI_API_KEY ||
    process.env.Gemini_API_key ||
    env.Gemini_API_key ||
    ''

  return {
    plugins: [react(), tailwindcss()],
    base: './',
    envPrefix: ['VITE_', 'Gemini_', 'GEMINI_'],
    define: {
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
      'import.meta.env.Gemini_API_key': JSON.stringify(geminiKey),
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/three/')) {
              return 'vendor-three';
            }
            if (id.includes('node_modules/@react-three/')) {
              return 'vendor-react-three';
            }
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
          },
        },
      },
    },
  }
})
