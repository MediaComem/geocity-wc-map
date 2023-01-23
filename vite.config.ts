import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/openlayers-element.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: ''
    }
  }
})
