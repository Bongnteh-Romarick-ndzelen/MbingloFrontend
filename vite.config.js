import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  // Backend API URL configuration
  const apiUrl = env.VITE_API_URL || 'http://localhost:3000'; // Default to local Express server
  const isProduction = mode === 'production';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env': {
        VITE_API_URL: JSON.stringify(apiUrl),
        VITE_ENABLE_ADMIN_REGISTRATION: JSON.stringify(env.VITE_ENABLE_ADMIN_REGISTRATION),
        VITE_ADMIN_SECRET: JSON.stringify(env.VITE_ADMIN_SECRET),
        VITE_MODE: JSON.stringify(mode),
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        // Proxy API requests in development
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'X-Forwarded-Proto': 'https', // Ensure proper protocol forwarding
          }
        },
        // Proxy WebSocket connections if needed
        '/socket.io': {
          target: apiUrl,
          ws: true,
          changeOrigin: true,
        }
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: !isProduction, // Disable sourcemaps in production
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react')) {
                return 'vendor-react';
              }
              if (id.includes('axios') || id.includes('react-router-dom')) {
                return 'vendor-essentials';
              }
              return 'vendor';
            }
          }
        }
      }
    },
    preview: {
      port: 5173,
      strictPort: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    }
  };
});