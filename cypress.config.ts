import { defineConfig } from 'cypress';

export default defineConfig({
  viewportHeight: 720,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**.cy.ts',
  },
})
