import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://data.gateapi.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'User-Agent': 'CoinWatch-App/1.0'
        }
      },
      '/proxy': {
        target: 'https://data.gateapi.io',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/proxy/, '')
      }
    }
  }
})
