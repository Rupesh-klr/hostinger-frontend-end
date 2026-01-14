import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import obfuscator from 'vite-plugin-javascript-obfuscator';
import path from 'path'; // CRITICAL: Added this import

export default defineConfig({
  plugins: [
    react(),
    // obfuscator({
    //   compact: true,
    //   controlFlowFlattening: true,
    //   deadCodeInjection: true,
    //   debugProtection: true,
    //   stringArray: true,
    //   rotateStringArray: true,https://accounts.google.com/v3/signin/accountchooser?client_id=775388863546-huooskea92qrm42qokb2tama5nqe0521.apps.googleusercontent.com&prompt=select_account&redirect_uri=https%3A%2F%2Fdodgerblue-hare-128861.hostingersite.com%2Fauth%2Fgoogle%2Fcallback&response_type=code&scope=profile+email&state=http%3A%2F%2Flocalhost%3A3002&dsh=S1849319328%3A1768398750445635&o2v=2&service=lso&flowName=GeneralOAuthFlow&opparams=%253F&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANFKZEr1uSsGhp2RNdKckZmjq1LFb6r0QIf6ov6f_QO27LRQuEsSxLmCeGOJ6Ca54yYLxD0Z-LQ-AW5m8tPvKVeVPB8buLCjeS_kbOWU8K-dh7Du-goWEowLP_fzSpxnI5QPM2YIpwuf3tn28Rj_wZkOY-ySlOJhfLS8mJEEzvwERPH6amu0hKX5odNeqNxwZDUE6mWNf_1V9iVjyosBRaBdxm4CVrN73gFSXNpLCatXCNYP6IN03SzB4rMgjCg2ueHQpYXLC0ZLZ8femL2Wu7RxFJ6RrXacadeG7KLnHodb_GXUqtZviUKI3VBZqMYdeZ10h4mTCeh7TIUIPqovFp3IURFNBrUDaCqoidZ2pxRcVm2dM6WwjCexLezac_bu8pdRhthlkRCPy5XobCFJ_TzhPrirTga35Deo5f7W1Cj_9YU5rcEW09C-uQxzq0v4pVeTG1UrOGNIMwYAfL0O5BhwR-PhU7ylsbkDz6vIAQtVzBg6C8RY4Bu8O5_OLC6JlUWj2Og%26flowName%3DGeneralOAuthFlow%26as%3DS1849319328%253A1768398750445635%26client_id%3D775388863546-huooskea92qrm42qokb2tama5nqe0521.apps.googleusercontent.com%26requestPath%3D%252Fsignin%252Foauth%252Fconsent%23&app_domain=https%3A%2F%2Fdodgerblue-hare-128861.hostingersite.com
    //   stringArrayThreshold: 0.75,
    // })
  ],
  base: '/', 
  build: {
    outDir: 'dist',
    // minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) return 'vendor';
        //   // Ensure these strings match your folder names exactly
        //   if (id.includes('solar-fintech')) return 'solar-fintech';
        //   if (id.includes('edtech')) return 'edtech'; 
        // },
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