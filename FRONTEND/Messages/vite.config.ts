import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    strictPort: true,
    allowedHosts: ["https://envie-mensagens.onrender.com"],
  },
  build: {
    outDir: 'dist', 
  },
  preview: {
    open: true,
    port: 5000, 
  },
});
