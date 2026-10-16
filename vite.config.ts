import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const geminiKey = process.env.Gemini_API_key || env.Gemini_API_key || ''

  return {
    plugins: [react(), tailwindcss()],
    base: './',
    envPrefix: ['VITE_', 'Gemini_'],
    define: {
      'import.meta.env.Gemini_API_key': JSON.stringify(geminiKey),
    },
  }
})
