import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  base: './', // 🔥 FUNDAMENTAL para Hostinger / subdiretórios
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
