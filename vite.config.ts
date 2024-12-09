import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '&': fileURLToPath(new URL('./mock', import.meta.url))
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      scopeBehaviour: 'local'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        math: 'always'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/mock': {
        target: 'http://v.juhe.cn',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/mock/, '')
      }
    }
  }
})
