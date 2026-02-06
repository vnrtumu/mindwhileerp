import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'src/api': resolve(__dirname, './src/api'),
      'src/assets': resolve(__dirname, './src/assets'),
      'src/components': resolve(__dirname, './src/components'),
      'src/context': resolve(__dirname, './src/context'),
      'src/css': resolve(__dirname, './src/css'),
      'src/layouts': resolve(__dirname, './src/layouts'),
      'src/lib': resolve(__dirname, './src/lib'),
      'src/routes': resolve(__dirname, './src/routes'),
      'src/types': resolve(__dirname, './src/types'),
      'src/views': resolve(__dirname, './src/views'),
      "@/components": resolve(__dirname, "./src/components"),
      "@/assets": resolve(__dirname, "./src/assets"),
      "@/hooks": resolve(__dirname, "./src/hooks"),
      "@/layouts": resolve(__dirname, "./src/layouts"),
      "@/routes": resolve(__dirname, "./src/routes"),
      "@/store": resolve(__dirname, "./src/store"),
      "@/views": resolve(__dirname, "./src/views"),
      "@/utils": resolve(__dirname, "./src/utils"),
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-tsx',
          setup(build) {
            build.onLoad(
              { filter: /src\\.*\.js$/ },
              async (args) => ({
                loader: 'tsx',
                contents: await fs.readFile(args.path, 'utf8'),
              })
            );
          },
        },
      ],
    },
  },
  build: {
    outDir: 'dist', // ✅ this is required for Netlify
  },
  plugins: [svgr(), react()],
});
