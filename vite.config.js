import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['mssql'], // Agrega 'mssql' aquí para que Vite lo maneje adecuadamente
  },
})
