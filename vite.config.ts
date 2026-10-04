import { defineConfig } from 'vite';
import { resolve } from 'path';
import { cpSync, existsSync } from 'fs';

export default defineConfig({
  base: '/EcuaStack/',

  plugins: [
    {
      name: 'copy-help-graf-assets',

      closeBundle() {
        const source = resolve(
          __dirname,
          'src/projects/help-graf/src'
        );

        const destination = resolve(
          __dirname,
          'dist/src/projects/help-graf/src'
        );

        if (existsSync(source)) {
          cpSync(source, destination, {
            recursive: true,
            force: true,
          });
        }
      },
    },
  ],

  build: {
    rollupOptions: {
      input: {
        main: resolve(
          __dirname,
          'index.html'
        ),

        helpGraf: resolve(
          __dirname,
          'src/projects/help-graf/src/index.html'
        ),
      },
    },
  },
});