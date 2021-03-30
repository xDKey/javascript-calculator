import { mount, unmount } from '@cypress/react';
import ButtonsPad from './ButtonsPad';

const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorButtons = ['/', 'x', '-', '+', 'AC', '=', '.'];

describe('<ButtonsPad />', () => {
  beforeEach(() => {
    const handleClick = cy.stub().as('click');
    const TestButtonsPad = () => (
      <div className='calculator'>
        <ButtonsPad handleClick={handleClick} />
      </div>
    );
    mount(<TestButtonsPad />);
    cy.waitForReact()
  });
  after(() => unmount())

  it('Contain 10 buttons with digits', () => {
    numberButtons.forEach((item) => cy.react('Button').contains(item));
  });

  it('Contain buttons with operands', () => {
    operatorButtons.forEach((item) => cy.react('Button').contains(item));
  });

  it('All buttons call handleClick on click', () => {
    [...numberButtons, ...operatorButtons].forEach((item) => {
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.react('Button')
        .contains(item)
        .click()
        .then(() => {
          cy.get('@click').should('have.been.called');
        });
    });
  });
});
