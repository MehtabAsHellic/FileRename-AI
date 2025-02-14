import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotli',
      ext: '.br'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'file-processing': ['docx', 'jspdf', 'pdf-lib', 'pdfjs-dist'],
          'ui-components': ['react-dropzone', 'react-hot-toast', 'lucide-react'],
          'ai-models': ['@xenova/transformers']
        }
      }
    },
    target: 'esnext',
    sourcemap: true,
    chunkSizeWarningLimit: 2000
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'jszip',
      '@xenova/transformers',
      'docx',
      'jspdf',
      'pdf-lib',
      'pdfjs-dist'
    ],
    exclude: ['@xenova/transformers']
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
});