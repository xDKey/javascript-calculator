import { mount } from '@cypress/react';
import Display from './Display';

describe('<Display />', () => {
  before(() => {
    mount(
      <Display
        currentDisplay='test current display'
        accumulateDisplay='test accumulate display'
      />
    );
    cy.waitForReact();
  });
  it('Should be mounted and contain div#display', () => {
    cy.get('#display').should('be.visible');
  });
  it('Correctly take properties and displaying they', () => {
    cy.get('#expression').contains('test accumulate display').should('be.visible');
    cy.get('#display').contains('test current display').should('be.visible');
  });
});
