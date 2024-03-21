import path from 'path'
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/index.ts', 
        'src/trpc/index.ts', 
        '**/__tests__/**', 
        '**/tests/**', 
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@server': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});