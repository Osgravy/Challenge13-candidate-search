import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0', // Add this
    port: 4173,      // Explicit port
    strictPort: true // Fail if port is unavailable
  }
})