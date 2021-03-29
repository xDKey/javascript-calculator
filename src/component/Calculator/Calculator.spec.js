import { mount, unmount } from '@cypress/react';
import Calculator from './Calculator';

describe('<Calculator />', () => {
  before(() => mount(<Calculator />));
  beforeEach(() => {
    cy.get('.button').contains('AC').click();
    cy.get('#display').as('result');
    cy.get('.display__accumulator').as('expression');
  });
  after(() => unmount())

  it('Renders correcly', () => {
    cy.get('@expression').should('not.have.text');
    cy.get('@result').should('have.text', '0');
    cy.get('.button').should('have.length', 17);
  });

  it('Should displaying numbers in #display on click and reset them on click "AC"', () => {
    cy.get('.button').contains('7').click();
    cy.get('@result').should('have.text', '7');
    cy.get('@expression').should('have.text', '7');
    cy.get('.button').contains('AC').click();
    cy.get('@result').should('have.text', '0');
    cy.get('@expression').should('not.have.text');
  });

  it('Should correcty computating on click "="', () => {
    const example = '10/2+-20x0.5=';
    example
      .split('')
      .forEach((item) => cy.get('.button').contains(item).click());
    cy.get('@expression').contains('10/2+-20x0.5 = -5');
    cy.get('@result').should('have.text', '-5');
  });

  it('Should change operand on click new operand and not allow input dots more that once', () => {
    const example = '10...5/x+0.5=';
    example
      .split('')
      .forEach((item) => cy.get('.button').contains(item).click());
    cy.get('@expression').contains('10.5+0.5 = 11');
    cy.get('@result').should('have.text', '11');
  });

  it('Should correctly continuing compute previous result after enter operands', () => {
    const example = '1+2=/+--+2...0+===';
    example
      .split('')
      .forEach((item) => cy.get('.button').contains(item).click());
    cy.get('@expression').contains('3+2.0 = 5');
    cy.get('@result').should('have.text', '5');
  });

  it('Should display "Too much digitals" on entering more 12 digits without operands', () => {
    for (let i = 0; i < 20; i++) {
      cy.get('.button').contains('1').click();
    }
    cy.get('@expression').should('have.text', '111111111111');
    cy.get('@result').should('have.text', 'Too much digitals');
  });
});
