import { mount, unmount } from '@cypress/react';
import Button from './Button';

describe('<Button />', () => {
  beforeEach(() => {
    const handleClick = cy.stub().as('click');
    mount(<Button innerText='test' id='test' handleClick={handleClick} />);
  });
  after(() => unmount())

  it('Should renders correctly', () => {
    cy.get('.button').contains('test').should('have.id', 'test');
  });

  it('Should call handleClick on click', () => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get('.button')
      .click()
      .then(() => {
        cy.get('@click').should('have.been.called');
      });
  });
});
