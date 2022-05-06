import { fileBoardIds } from '../fixtures/constants';

// using the after hook of Mocha to clear all the boards

after(() => {
    cy.readFile(fileBoardIds).then((listIds) => {
        cy.deleteAllBoards(listIds);
        cy.writeFile(fileBoardIds, []);
    });
});