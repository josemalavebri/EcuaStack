import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/EcuaStack/',

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