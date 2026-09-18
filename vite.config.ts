import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vike from 'vike/plugin'
// NOTA: El paquete oficial actual se llama 'vike-vercel'. 
// Si instalaste 'vike/plugin-vercel', cámbialo a 'vike-vercel' en tu terminal: npm install vike-vercel
import vikeVercel from 'vike-vercel' 
import path from 'path'
import { fileURLToPath } from 'url'

// 1. SOLUCIÓN ROBUSTA PARA __dirname en Módulos ES (Evita fallos en Vercel)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  // 2. Base '/' es correcta para despliegues en la raíz de .vercel.app
  base: '/',
  
  server: {
    host: '::',
    port: 8080,
  },
  
  plugins: [
    react(),
    vike(),
    vikeVercel() // El adaptador debe ir al final de la lista de plugins
  ],
  
  resolve: {
    alias: {
      // 3. Ahora __dirname funcionará perfectamente en Linux (Vercel) y local
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 4. Configuración explícita de build para evitar problemas de assets
  build: {
    outDir: 'dist',
    sourcemap: false, // Mejora el rendimiento en producción
    rollupOptions: {
      output: {
        // Asegura que los hashes de los archivos se generen correctamente
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})