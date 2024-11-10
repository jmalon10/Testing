describe('Tech Quiz End-to-End Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow the user to start the quiz', () => {
    // Using custom command to start the quiz
    cy.startQuiz();
    
    // Verify the quiz starts with the first question
    cy.get('h2').should('contain', 'Question');
    cy.get('.btn').should('have.length', 4); // Assuming each question has 4 answer choices
  });

  it('should allow the user to answer questions and complete the quiz', () => {
    // Start the quiz
    cy.startQuiz();

    // Load fixture data and answer all questions
    cy.fixture('questions.json').then((questions) => {
      cy.answerAllQuestionsCorrectly(questions);

      // Verify quiz completion message
      cy.get('h2').should('contain', 'Quiz Completed');
      cy.get('.alert').should('contain', `Your score: ${questions.length}/${questions.length}`);
    });
  });

  it('should display the correct score on quiz completion', () => {
    cy.startQuiz();

    cy.fixture('questions.json').then((questions) => {
      questions.forEach((question, index) => {
        if (index % 2 === 0) {
          // Answer correctly every second question
          cy.get('.btn').contains(1).click();
        } else {
          // Answer incorrectly for others
          cy.get('.btn').contains(2).click();
        }
      });

      // Expected score based on correct answers
      const expectedScore = Math.floor(questions.length / 2);
      cy.get('h2').should('contain', 'Quiz Completed');
      cy.get('.alert').should('contain', `Your score: ${expectedScore}/${questions.length}`);
    });
  });

  it('should allow the user to retake the quiz', () => {
    // Start and complete the quiz
    cy.startQuiz();
    cy.fixture('questions.json').then((questions) => {
      cy.answerAllQuestionsCorrectly(questions);
    });

    // Reset and retake the quiz
    cy.resetQuiz();

    // Check that the quiz restarts correctly
    cy.get('h2').should('contain', 'Question');
    cy.get('h2').should('not.contain', 'Quiz Completed');
  });
});

  