import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the root directory
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      // For client-side access to environment variables
      'process.env': {
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
        VITE_ENABLE_ADMIN_REGISTRATION: JSON.stringify(env.VITE_ENABLE_ADMIN_REGISTRATION),
        VITE_ADMIN_SECRET: JSON.stringify(env.VITE_ADMIN_SECRET)
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        // Proxy API requests to your backend
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});