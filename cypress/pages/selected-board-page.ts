import { onMyBoardsPage } from './my-boards-page';

class SelectedBoardPage {

    checkBoardTitle(expected: string) {
        cy.getElem('board-title').should('have.value', expected);
    }

    clickMyBoardsBtn() {
        cy.contains('My Boards').click();
        return onMyBoardsPage;
    }

}

export const onSelectedBoardPage = new SelectedBoardPage();