import { defineConfig } from 'vite'
//import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  // This is for testing purpose on smartphone
  //plugins: [ basicSsl() ],
  //server: { https: true },
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
