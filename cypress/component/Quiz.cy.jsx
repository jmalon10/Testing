import Quiz from '../../client/src/components/Quiz.tsx';

const mockQuestions = [
  {
    "question": "What is the capital of France?",
    "answers": [
      { "text": "Paris", "isCorrect": true },
      { "text": "London", "isCorrect": false },
      { "text": "Berlin", "isCorrect": false },
      { "text": "Madrid", "isCorrect": false }
    ]
  },
  {
    "question": "What is 2 + 2?",
    "answers": [
      { "text": "4", "isCorrect": true },
      { "text": "3", "isCorrect": false },
      { "text": "5", "isCorrect": false },
      { "text": "2", "isCorrect": false }
    ]
  },
];
describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', mockQuestions).as('getQuestions');
  }); 

  it('should start the quiz when Start Quiz button is clicked', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('.card').should('be.visible');
  });

  it('should display the first question after loading', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.fixture('questions').then((questions) => {
      cy.get('h2').should('contain', questions[0].question);
    });
  });
  
  it('should display the second question after the first', () => {
    cy.fixture('questions').then((questions) => {
      cy.mount(<Quiz />);
      cy.get('button').contains('Start Quiz').click();
      cy.get('button').contains('1').click();
      cy.get('h2').should('contain', questions[1].question);
    });
  });

  it('when all questions are answered, the game is over', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('button').contains('1').click();
    cy.get('button').contains('4').click();
    cy.get('h2').should('contain', "Quiz Completed");
    });

    it('should display the score after the quiz is completed', () => {
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('button').contains('1').click();
    cy.get('button').contains('4').click();
    cy.get('.alert').should('be.visible');
    });

    it('should be able to restart the quiz after it is completed', () => {
      cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('button').contains('1').click();
    cy.get('button').contains('4').click();
    cy.get('button').should('contain', 'Take New Quiz');
    cy.get('button').contains('Take New Quiz').click();
    cy.fixture('questions').then((questions) => {
      cy.get('h2').should('contain', questions[0].question);
    });
    });
});
