// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 1. Importe 'path' do Node.js
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
  ],
  
  // 2. Adicione a configuração de 'resolve'
  resolve: {
    alias: {
      // Mapeia o alias '@/' para o caminho absoluto do diretório 'src'
      "@": path.resolve(__dirname, "./src"),
    },
  },
});