import { defineConfig } from 'vite';
import { resolve } from 'path';
import { cpSync, existsSync, readFileSync, writeFileSync } from 'fs';

export default defineConfig({
  base: '/EcuaStack/',

  plugins: [
    {
      name: 'copy-project-assets',

      closeBundle() {
        const projects = [
          {
            source: resolve(
              __dirname,
              'src/projects/help-graf/src'
            ),
            destination: resolve(
              __dirname,
              'dist/src/projects/help-graf/src'
            ),
          },
          {
            source: resolve(
              __dirname,
              'src/projects/lisy-dance-cuba/public'
            ),
            destination: resolve(
              __dirname,
              'dist/src/projects/lisy-dance-cuba'
            ),
          },
        ];

        for (const { source, destination } of projects) {
          if (!existsSync(source)) {
            console.warn(
              `[Vite] No existe el directorio: ${source}`
            );
            continue;
          }

          cpSync(source, destination, {
            recursive: true,
            force: true,
          });
        }
      },
    },

    {
      name: 'fix-lisy-dance-cuba-image-paths',

      closeBundle() {
        const htmlPath = resolve(
          __dirname,
          'dist/src/projects/lisy-dance-cuba/index.html'
        );

        if (!existsSync(htmlPath)) {
          console.warn(
            '[Vite] No se encontró el index.html de Lisy Dance Cuba.'
          );
          return;
        }

        let html = readFileSync(htmlPath, 'utf-8');

        html = html.replace(
          /(["'])\/img\//g,
          '$1./img/'
        );

        writeFileSync(htmlPath, html, 'utf-8');

        console.log(
          '[Vite] Rutas de imágenes de Lisy Dance Cuba ajustadas.'
        );
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

        lisyDanceCuba: resolve(
          __dirname,
          'src/projects/lisy-dance-cuba/index.html'
        ),
      },
    },
  },
});