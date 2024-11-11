// e2e.js
import './commands';

// Set a base URL for all end-to-end tests
Cypress.on('uncaught:exception', (_err, _runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  return false;
});

// Example: intercepting the API endpoint for questions globally
beforeEach(() => {
  cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions');
});