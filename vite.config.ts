import { defineConfig } from "vite";
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (mode === 'expose') {
    return {
      plugins: [ basicSsl() ],
      server: { https: true },
      build: {
        lib: {
          entry: "src/openlayers-element.ts",
          formats: ["es"],
        },
        rollupOptions: {
          external: "",
        },
      }
    }
  } else {
    return {
      build: {
        lib: {
          entry: "src/openlayers-element.ts",
          formats: ["es"],
        },
        rollupOptions: {
          external: "",
        },
      }
    }
  }
});
