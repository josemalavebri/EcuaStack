import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Ecuastack/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        imprenta: resolve(
          __dirname,
          'src/projects/landing-imprenta/index.html'
        ),
      },
    },
  },
});