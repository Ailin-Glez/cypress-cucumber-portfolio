import { onMyBoardsPage } from "../my-boards-page/my-boards-page";

const locators = {
    createBoardInput: 'create-board',
    selectedBoardTitle: 'board-title'
}
class SelectedBoardPage {

    checkBoardTitle(expected: string) {
        cy.get(`[data-cy=${locators.selectedBoardTitle}]`)
            .should('have.value', expected);
    }

    clickMyBoardsBtn() {
        cy.contains('My Boards').click();
        return onMyBoardsPage;
    }
}

export const onSelectedBoardPage = new SelectedBoardPage();