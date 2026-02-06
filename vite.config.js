import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'src': resolve(__dirname, './src/superAdmin'),
      '/src': resolve(__dirname, './src/superAdmin'),
      "@/components": resolve(__dirname, "./src/superAdmin/components"),
      "@/assets": resolve(__dirname, "./src/superAdmin/assets"),
      "@/hooks": resolve(__dirname, "./src/superAdmin/hooks"),
      "@/layouts": resolve(__dirname, "./src/superAdmin/layouts"),
      "@/routes": resolve(__dirname, "./src/superAdmin/routes"),
      "@/store": resolve(__dirname, "./src/superAdmin/store"),
      "@/views": resolve(__dirname, "./src/superAdmin/views"),
      "@/utils": resolve(__dirname, "./src/superAdmin/utils"),
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.tsx?$/,
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
