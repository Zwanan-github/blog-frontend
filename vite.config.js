import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { fileURLToPath, URL } from 'node:url'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'modules',
    modulePreload: {polyfill: true},
    chunkSizeWarningLimit: 1024,
    cssCodeSplit: false,
  },
  plugins: [
    vue({
      template: {transformAssetUrls},
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed
      ],
    },
  },
  define: {'process.env': {}},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.mjs',
      '.ts',
      '.vue',
    ],
  },
  server: {
    host: true,
    port: 80,
    proxy: {
      // api请求转发至后端
      '/api/': {
        // target: 'http://localhost:8888/',
        target: 'http://123.60.107.63:8080/',
        changeOrigin: true,
        followRedirects: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
