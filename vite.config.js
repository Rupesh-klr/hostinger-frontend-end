import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscator from 'vite-plugin-javascript-obfuscator';
import path from 'path'; // CRITICAL: Added this import

export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      debugProtection: true,
      stringArray: true,
      rotateStringArray: true,
      stringArrayThreshold: 0.75,
    })
  ],
  base: '/', 
  build: {
    outDir: 'dist',
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          // Ensure these strings match your folder names exactly
          if (id.includes('solar-fintech')) return 'solar-fintech';
          if (id.includes('edtech')) return 'edtech'; 
        },
      },
    },
  },
  resolve: {
    alias: {
      // Allows you to use import {..} from '@/utils/..'
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/back-endchanging': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});