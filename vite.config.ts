import { defineConfig } from 'vite'
import litcss from 'rollup-plugin-lit-css';

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
