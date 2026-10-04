import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/EcuaStack/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        helpGraf: resolve(
          __dirname,
          'src/projects/help-graf/src/index.html'
        ),
      },
    },
  },
});