import React from 'react';
import Quiz from '../../client/src/components/Quiz.tsx';
import questions from '../fixtures/questions.json';

describe('Quiz Component', () => {
  beforeEach(() => {
    // Set up a mock of getQuestions so it returns a known set of questions
    cy.intercept('GET', '/api/questions', { body: questions }).as('getQuestions');
  });

  it('should start the quiz when Start Quiz button is clicked', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.spinner-border').should('be.visible');
    cy.wait('@getQuestions');
  });

  it('should display the first question after loading', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('contain', questions[0].question);
  });

  it('should display the score and completion message after finishing', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    questions.forEach((q) => {
      cy.get('button').contains(1).click(); // Assume answer 1 is correct
    });

    cy.get('h2').should('contain', 'Quiz Completed');
    cy.get('.alert').should('contain', `Your score: ${questions.length}/${questions.length}`);
  });
});
