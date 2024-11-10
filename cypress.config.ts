import { defineConfig } from "cypress";
import vitePreprocessor from "@cypress/vite-dev-server";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    video: false, // Optional: Disable video recording for component tests if you want
    screenshotOnRunFailure: true, // Optional: Automatically take screenshots on failure
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Add any node event listeners here, if needed
    },
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts", // For e2e tests (can be omitted if not needed)
  },
});