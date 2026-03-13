import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  // Check if we are building on Netlify
  const isNetlify = process.env.NETLIFY === 'true';

  return {
    // If on Netlify, use root '/'. If not (GH Pages), use '/pokemon/'
    base: isNetlify ? '/' : '/pokemon/',
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      allowedHosts: true
    }
  }
})

