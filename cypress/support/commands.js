// commands.js
Cypress.Commands.add("startQuiz", () => {
    // Custom command to start the quiz
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
  });
  
  Cypress.Commands.add("answerAllQuestionsCorrectly", (questions) => {
    // Custom command to answer all questions correctly
    questions.forEach(() => {
      cy.get('button').contains(1).click(); // Assuming the first answer is correct
    });
  });
  
  Cypress.Commands.add("resetQuiz", () => {
    // Custom command to reset the quiz after completion
    cy.get('button').contains('Take New Quiz').click();
  });
  