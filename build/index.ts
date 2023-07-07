import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/index.ts'),
      formats: ['umd', 'es'],
      fileName: (f) => {
        return f === 'umd' ? 'index.js' : 'index.mjs'
      },
      name: 'ArcoFormBuilder',
    },
    rollupOptions: {
      external: [
        'vue',
        '@arco-design/web-vue',
        'axios',
        '@arco-design/web-vue/es/icon',
        'vuedraggable',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
})
