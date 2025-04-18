/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path, { resolve } from 'path'

import { coverageConfigDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, './test/setup/setup.ts')],
    globals: true,
    coverage: {
      provider: 'v8',
      exclude: [
        'src/main.tsx',
        'src/components/ui/**',
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        branches: 90,
        functions: 80,
        statements: 90,
        lines: 90,
      },
    },
  },
})
