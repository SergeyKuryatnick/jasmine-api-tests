/// <reference types="cypress" />

describe('first test', () => {

    beforeEach(() => {
        cy.visit('/')
    });

    it('test', () => {
        // cy.get('title').then(result => {
        //     expect(result).to.be.eq('Dashboard | Freelancer')
        // })
        cy.title().should('contain', 'My Awesome Application');
    });
});