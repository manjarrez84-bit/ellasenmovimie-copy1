import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vike from 'vike/plugin'
import path from 'path'
import { fileURLToPath } from 'url'

// Solución robusta para __dirname en entornos Node.js modernos (ES Modules)
// Esto evita que Vercel (Linux) falle al resolver los alias '@/''
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  base: '/',
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [
    react(),
    vike()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Optimiza el tamaño final en Vercel
  }
})