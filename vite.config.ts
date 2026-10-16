import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const geminiKey =
    process.env.Gemini_API_key ||
    env.Gemini_API_key ||
    process.env.GEMINI_API_KEY ||
    env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    env.VITE_GEMINI_API_KEY ||
    ''

  return {
    plugins: [react(), tailwindcss()],
    base: './',
    envPrefix: ['VITE_', 'Gemini_', 'GEMINI_'],
    define: {
      'import.meta.env.Gemini_API_key': JSON.stringify(geminiKey),
      'import.meta.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
    },
  }
})
