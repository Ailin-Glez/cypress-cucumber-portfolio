import { onSelectedBoardPage } from "../selected-board-page/selected-board-page";

const locators = {
    createBoardInput: 'create-board',
    boardTitle: 'board_title',
    saveBtn: 'new-board-create',
    boardItems: 'board-item'
}

class MyBoardsPage {

    enterBoardName(name: string) {
        cy.get(`[data-cy=${locators.createBoardInput}]`).type(name);
    }

    clickSaveBtn() {
        cy.get(`[data-cy=${locators.saveBtn}]`).click();
    }

    createBoard(name: string) {
        cy.get(`[data-cy=${locators.createBoardInput}]`).type(`${name}{enter}`);
        return onSelectedBoardPage;
    }

    checkBoardsDisplayed(expectedBoards: number) {
        cy.get(`[data-cy=${locators.boardItems}]`).should('have.length', expectedBoards);
    }

    checkNewBoardOption() {
        cy.get(`[data-cy=${locators.createBoardInput}]`).should('be.visible').find('h1').should('have.text', 'Create a board...');
    }

}

export const onMyBoardsPage = new MyBoardsPage();