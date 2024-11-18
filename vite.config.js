// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["pdfjs-dist"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pdfjs: ["pdfjs-dist"],
        },
      },
    },
  },
});