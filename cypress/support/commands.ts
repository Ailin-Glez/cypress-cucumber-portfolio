import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';

Cypress.Commands.add('getElem', (element: string) => {
    return cy.get(`[data-cy="${element}"]`);
});

Cypress.Commands.add('deleteAllBoards', (boardIds: number[]) => {
    console.log(boardIds)
    boardIds.forEach((id) => {
        cy.request('DELETE', `/api/boards/${id}`);
    });
});
