import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
    // Add this:
    allowedHosts: [
      'challenge13-candidate-search.onrender.com',
      'localhost' // Keep local development access
    ]
  }
})