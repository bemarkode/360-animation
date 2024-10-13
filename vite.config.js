import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/your-repo-name/', // Replace with your GitHub repository name
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  resolve: {
    alias: {
      'three': resolve(__dirname, 'node_modules/three'),
      'three/examples/jsm': resolve(__dirname, 'node_modules/three/examples/jsm'),
    },
  },
});