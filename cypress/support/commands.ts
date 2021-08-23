
Cypress.Commands.add('getElem', (element: string) => {
    return cy.get(`[data-cy="${element}"]`);
});
