/* eslint-disable jest/valid-expect-in-promise */
const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorButtons = ['/', 'x', '-', '+', 'AC', '=', '.'];
before(() => {
  cy.visit('/');
  cy.waitForReact(1000, '#root')
});

describe('Correctly rendering', () => {
  it('Contain div.calculator', () => {
    // cy.get('.calculator').should('contain', '0');
    cy.react('Display').should('contain', 0)
  });

  it('Contain 10 buttons with digits', () => {
    numberButtons.forEach((item) => cy.react('Button').contains(item));
  });

  it('Contain buttons with operands', () => {
    operatorButtons.forEach((item) => cy.react('Button').contains(item));
  });
});

describe('Correctly entering numbers', () => {
  afterEach(() => {
    cy.contains('AC').click();
  });
  it('Should displaying numbers in #display', () => {
    numberButtons.forEach((item) => {
      cy.react('Button').contains(item).click();
    });
    cy.get('#display').contains(numberButtons.join(''));
  });
  it('Should reset displaying digits on click "AC"', () => {
    numberButtons.forEach((item) => {
      cy.react('Button').contains(item).click();
      cy.get('#display').should('have.text', item);
      cy.react('Button').contains('AC').click();
      cy.get('#display').should('have.text', '0');
    });
  });
  it('Should display "Too much digitals" on entering more 12 digits without operands', () => {
    for (let i = 0; i < 20; i++) {
      cy.react('Button').contains('1').click();
    }
    cy.get('#expression').should('have.text', '111111111111');
    cy.get('#display').should('have.text', 'Too much digitals');
  });
});

describe('Correctly computating on click "="', () => {
  afterEach(() => {
    cy.contains('AC').click();
  });

  it('Should correctly compute simple expression with negative digits "1 + 3 + -3 = 1"', () => {
    const example = '1 + 3 + - 3 =';
    example.split(' ').forEach((item) => {
      cy.react('Button').contains(item).click();
    });
    cy.get('#expression').should('have.text', '1+3+-3 = 1');
    cy.get('#display').should('have.text', '1');
  });
  it('Should correctly compute difficult expression "10 + 5 x 2 = 20"', () => {
    const example = '1 0 + 5 x 2 =';
    example.split(' ').forEach((item) => {
      cy.react('Button').contains(item).click();
    });
    cy.get('#expression').should('have.text', '10+5x2 = 20');
    cy.get('#display').should('have.text', '20');
  });
  it('Should correctly compute expression with decimal numbers "10 + 1.20 - 20 x .5 = 1.2"', () => {
    const example = '10+1.20-20x.5=';
    example
      .split('')
      .forEach((item) => cy.react('Button').contains(item).click());
    cy.get('#expression').should('have.text', '10+1.20-20x.5 = 1.2');
    cy.get('#display').should('have.text', '1.2');
  });
  it('Correctly compute expression "1 + 1 = 2 + 1 = 3... etc"', () => {
    const example = '+ 1 ='.split(' ');
    cy.react('Button')
      .contains('1')
      .click()
      .then(() => {
        for (let i = 0; i < 5; i++) {
          example.forEach((item) => cy.react('Button').contains(item).click());
        }
        cy.get('#display').should('have.text', '6');
      });
  });
});
