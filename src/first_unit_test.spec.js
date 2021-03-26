import {mount} from 'cypress-react-unit-test'
import Display from './component/Display/Display'

describe('Display component', () => {
    it('Works!', () => {
        mount(<Display currentDisplay='test' accumulateDisplay='test'/>)
        cy.contains('test').should('be.visible')
    })
})