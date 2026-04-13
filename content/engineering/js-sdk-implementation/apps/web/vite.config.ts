import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envDir: '../../',
  server: {
    host: '127.0.0.1',   // 👈 IMPORTANT
    port: 5173,
    strictPort: true
  }
})