import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscator from 'vite-plugin-javascript-obfuscator';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // ⚠️ ONLY enable obfuscator for production build to avoid debugging headaches
    process.env.NODE_ENV === 'production' ? obfuscator({
      compact: true,
      controlFlowFlattening: false, // Set to false if you experience high lag
      deadCodeInjection: false,
      debugProtection: true,
      disableConsoleOutput: false, // Keep logs for now so you can debug
      stringArray: true,
      rotateStringArray: true,
      stringArrayThreshold: 0.75,
      // CRITICAL: Prevent the plugin from breaking your auth logic
      reservedStrings: ['AUTH_SUCCESS', 'user', 'displayName', 'givenName']
    }) : null
  ].filter(Boolean),

  resolve: {
    alias: {
      // Correctly maps @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3002, // Explicitly set to match your localhost:3002 testing
    proxy: {
      // Redirects local API/Auth calls to your Hostinger backend
      '/api': {
        target: 'https://dodgerblue-hare-128861.hostingersite.com',
        changeOrigin: true,
        secure: true,
      },
      '/auth': {
        target: 'https://dodgerblue-hare-128861.hostingersite.com',
        changeOrigin: true,
        secure: true,
      }
    },
  },

  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        // Only drop logs in true production
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Optimized chunking for your Solar and EdTech projects
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          if (id.includes('solar-fintech')) return 'solar-fintech';
          if (id.includes('edtech')) return 'edtech';
        },
      },
    },
  },
});