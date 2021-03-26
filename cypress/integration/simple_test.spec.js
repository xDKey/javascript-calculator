const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorButtons = ['/', 'x', '-', '+', 'AC', '=', '.'];

describe('Correctly rendering', () => {
  it('Contain div.calculator', () => {
    cy.get('.calculator').should('contain', '0');
  });

  it('Contain 10 buttons with digits', () => {
    numberButtons.forEach((item) => cy.get('.button').contains(item));
  });

  it('Contain buttons with operands', () => {
    operatorButtons.forEach((item) => cy.get('.button').contains(item));
  });
});

describe('Correctly entering numbers', () => {
  afterEach(() => {
    cy.contains('AC').click();
  });
  it('Should displaying numbers in #display', () => {
    numberButtons.forEach((item) => {
      cy.get('.button').contains(item).click();
    });
    cy.get('#display').contains(numberButtons.join(''));
  });
  it('Should reset displaying digits on click "AC"', () => {
    numberButtons.forEach((item) => {
      cy.get('.button').contains(item).click();
      cy.get('#display').contains(item);
      cy.get('.button').contains('AC').click();
      cy.get('#display').contains('0');
    });
  });
  it('Should display "Too much digitals" on entering more 12 digits without operands', () => {
    for (let i = 0; i < 20; i++) {
      cy.get('.button').contains('1').click();
    }
    cy.get('.display__accumulator').contains('111111111111');
    cy.get('#display').contains('Too much digitals');
  });
});

describe('Correctly computating on click "="', () => {
  beforeEach(() => {
    cy.get('.display__accumulator').as('expression');
    cy.get('#display').as('res');
  });
  afterEach(() => {
    cy.contains('AC').click();
  });

  it('Should correctly compute simple expression with negative digits "1 + 3 + -3 = 1"', () => {
    const example = '1 + 3 + - 3 =';
    example.split(' ').forEach((item) => {
      cy.get('.button').contains(item).click();
    });
    cy.get('@expression').contains('1+3+-3 = 1');
    cy.get('@res').contains('1');
  });
  it('Should correctly compute difficult expression "10 + 5 x 2 = 20"', () => {
    const example = '1 0 + 5 x 2 =';
    example.split(' ').forEach((item) => {
      cy.get('.button').contains(item).click();
    });
    cy.get('@expression').contains('10+5x2 = 20');
    cy.get('@res').contains('20');
  });
  it('Should correctly compute expression with decimal numbers "10 + 1.20 - 20 x .5 = 1.2"', () => {
    const example = '10+1.20-20x.5=';
    example
      .split('')
      .forEach((item) => cy.get('.button').contains(item).click());
    cy.get('@expression').contains('10+1.20-20x.5 = 1.2');
    cy.get('@res').contains('1.2');
  });
});

describe('Should correctly continuing compute previous result after enter operands', () => {
  afterEach(() => {
    cy.contains('AC').click();
  });
  it('Correctly compute expression "1 + 1 = 2 + 1 = 3... etc"', () => {
    const example = '+ 1 ='.split(' ');
    cy.get('.button')
      .contains('1')
      .click()
      .then(() => {
        for (let i = 0; i < 5; i++) {
          example.forEach((item) => cy.get('.button').contains(item).click());
        }
        cy.get('#display').contains('6');
      });
  });
});
