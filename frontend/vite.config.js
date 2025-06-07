// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Your React app runs here
    proxy: {
      '/api': 'http://localhost:3000' // Proxy API calls to backend
    }
  }
});
