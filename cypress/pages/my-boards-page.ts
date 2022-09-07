import { fileBoardIds } from '../fixtures/constants';
import { onSelectedBoardPage } from './selected-board-page';

const locators = {
    createBoardInput: 'create-board',
    boardTitle: 'board_title',
    saveBtn: 'new-board-create',
    boardItems: 'board-item'
}

function saveBoardIdToFile() {
    cy.wait('@boardCreation').then((rq) => {
        cy.readFile(fileBoardIds).then((list) => {
            list.push(rq.response.body.id);
            cy.writeFile(fileBoardIds, list);
        });
    });
}

class MyBoardsPage {

    enterBoardName(name: string) {
        cy.getElem(locators.createBoardInput).type(name);
        return this;
    }

    clickSaveBtn() {
        cy.getElem(locators.saveBtn).click();
        saveBoardIdToFile();
        return this;
    }

    createBoard(name: string) {
        cy.getElem(locators.createBoardInput).type(`${name}{enter}`);
        saveBoardIdToFile();
        return onSelectedBoardPage;
    }

    checkBoardsDisplayed(expectedBoards: number) {
        cy.getElem(locators.boardItems).should('have.length', expectedBoards);
        return this;
    }

    checkNewBoardOption() {
        cy.getElem(locators.createBoardInput).should('be.visible').find('h1').should('have.text', 'Create a board...');
        return this;
    }

}

export const onMyBoardsPage = new MyBoardsPage();