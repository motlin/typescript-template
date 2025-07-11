import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        /^node:/,
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    open: true,
    cors: true,
  },
  preview: {
    port: 3001,
    strictPort: false,
    open: true,
    cors: true,
  },
  esbuild: {
    target: 'esnext',
    platform: 'node',
    format: 'esm',
  },
  optimizeDeps: {
    include: [],
    exclude: [],
  },
  test: {
    globals: true,
    environment: 'node',
    includeSource: ['src/**/*.{js,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/__tests__/**',
        '**/*.test.*',
        '**/*.spec.*',
      ],
    },
  },
});
