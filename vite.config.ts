import react from '@vitejs/plugin-react'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
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
        },
        '/api': {
          target: env.VITE_BASE_PROXY_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
