import { onSelectedBoardPage } from './selected-board-page';

const locators = {
    createBoardInput: 'create-board',
    boardTitle: 'board_title',
    saveBtn: 'new-board-create',
    boardItems: 'board-item'
}

class MyBoardsPage {

    enterBoardName(name: string) {
        cy.getElem(locators.createBoardInput).type(name);
    }

    clickSaveBtn() {
        cy.getElem(locators.saveBtn).click();
    }

    createBoard(name: string) {
        cy.getElem(locators.createBoardInput).type(`${name}{enter}`);
        return onSelectedBoardPage;
    }

    checkBoardsDisplayed(expectedBoards: number) {
        cy.getElem(locators.boardItems).should('have.length', expectedBoards);
    }

    checkNewBoardOption() {
        cy.getElem(locators.createBoardInput).should('be.visible').find('h1').should('have.text', 'Create a board...');
    }

}

export const onMyBoardsPage = new MyBoardsPage();