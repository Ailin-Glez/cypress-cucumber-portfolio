// using the beforeEach hook of Mocha to visit the app befeore each test
beforeEach(() => {
    cy.visit('/');
});