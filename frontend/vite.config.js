// vite.config.js

export default {
  server: {
    host: true,         // expose to github.dev
    port: 5173,         // use 5173 (default GitHub Codespaces Vite port)
    strictPort: true,   // if 5173 in use, fail — avoids browser mismatch
    hmr: {
      clientPort: 443   // hot reload over HTTPS
    }
  }
};
