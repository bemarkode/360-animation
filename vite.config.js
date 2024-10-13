import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // This ensures that asset paths are relative
  build: {
    outDir: 'dist', // Output directory for the build
    assetsDir: 'assets', // Directory for assets within the output directory
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          'three-examples': ['three/examples/jsm/controls/OrbitControls', 'three/examples/jsm/loaders/GLTFLoader']
        }
      }
    }
  },
  resolve: {
    alias: {
      'three': 'three',
      'three/examples/jsm/controls/OrbitControls': 'three/examples/jsm/controls/OrbitControls',
      'three/examples/jsm/loaders/GLTFLoader': 'three/examples/jsm/loaders/GLTFLoader',
      'three/examples/jsm/libs/stats.module': 'three/examples/jsm/libs/stats.module'
    }
  }
});