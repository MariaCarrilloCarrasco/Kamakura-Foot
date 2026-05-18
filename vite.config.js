import { defineConfig } from 'vitest/config'

export default defineConfig({
  //Añadimos soporte al navegador
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.js',
    css:true,
  }
})