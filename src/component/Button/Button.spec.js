import { mount, unmount } from '@cypress/react';
import Button from './Button';

describe('<Button />', () => {
  beforeEach(() => {
    const handleClick = cy.stub().as('click');
    mount(<Button innerText='test' id='test' handleClick={handleClick} />);
    cy.waitForReact()
  });
  after(() => unmount())

  it('Should renders correctly', () => {
    cy.react('Button').contains('test').should('have.id', 'test');
  });

  it('Should call handleClick on click', () => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.react('Button')
      .click()
      .then(() => {
        cy.get('@click').should('have.been.called');
      });
  });
});
