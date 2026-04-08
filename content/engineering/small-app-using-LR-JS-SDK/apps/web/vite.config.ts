import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  envDir: '../../',   // ✅ load root .env
  server: {
    port: Number(process.env.VITE_WEB_PORT1) || 5173
  }
})