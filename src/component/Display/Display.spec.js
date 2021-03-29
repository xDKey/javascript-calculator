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
  });
  it('Should be mounted and contain div#display', () => {
    cy.get('#display').should('be.visible');
  });
  it('Correctly take properties and displaying they', () => {
    cy.contains('test current display').should('be.visible');
    cy.contains('test accumulate display').should('be.visible');
  });
});
