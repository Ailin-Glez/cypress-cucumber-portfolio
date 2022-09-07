import { fileBoardIds } from '../fixtures/constants';
import { onMyBoardsPage } from '../pages/my-boards-page';
import { onSelectedBoardPage } from '../pages/selected-board-page';

describe('Board Tests', () => {

    const boardName = 'First Board';
    const boardNames = ['Board #1', 'Board #2'];

    beforeEach(() => {
        cy.readFile(fileBoardIds).then((listIds) => {
            cy.deleteAllBoards(listIds);
            cy.writeFile(fileBoardIds, []);
        });
        cy.visit('/');
        cy.intercept('POST', '**/boards').as('boardCreation');
    });

    it('should create a new board', () => {
        onMyBoardsPage.enterBoardName(boardName).clickSaveBtn();
        onSelectedBoardPage.checkBoardTitle(boardName);
    });

    it('should create multiple boards', () => {
        boardNames.forEach((board) => {
            onMyBoardsPage.createBoard(board).checkBoardTitle(board);
            onSelectedBoardPage.clickMyBoardsBtn();
        });
        onMyBoardsPage.checkBoardsDisplayed(2);
        onMyBoardsPage.checkNewBoardOption();
    });
});