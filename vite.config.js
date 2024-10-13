import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './', // This ensures that asset paths are relative
  build: {
    outDir: 'dist', // Output directory for the build
    assetsDir: 'assets', // Directory for assets within the output directory
  },
  resolve: {
    alias: {
      'three': path.resolve(__dirname, 'node_modules/three'),
    },
  },
  optimizeDeps: {
    include: ['three']
  }
});