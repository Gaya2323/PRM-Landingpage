import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  base: '/PRM-Landingpage/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('pn-')
        }
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
})