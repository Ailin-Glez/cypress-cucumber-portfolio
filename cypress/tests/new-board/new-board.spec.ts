import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { onMyBoardsPage } from "../../pages/my-boards-page/my-boards-page";
import { onSelectedBoardPage } from "../../pages/selected-board-page/selected-board-page";

Given('I have no boards', () => {
    // exposing app to our window context in order to call the function 'resetBoards'
    cy.window().then(({ app }) => {
        app.resetBoards();
    });
});

When('I enter {string} as board name', (boardName: string) => {
    onMyBoardsPage.enterBoardName(boardName);
});

When('I create multiple boards with the names:', (dataTable) => {
    // iterating through each element of the table to create a board with the
    for (let i = 0; i < dataTable.rawTable.length; i++) {
        const boardName = dataTable.rawTable[i][0];
        onMyBoardsPage.createBoard(boardName).checkBoardTitle(boardName);
        onSelectedBoardPage.clickMyBoardsBtn();
    }
});

And('I click on the Save button', () => {
    onMyBoardsPage.clickSaveBtn();
});

Then('the board screen is displayed with the name {string}', (boardName: string) => {
    onSelectedBoardPage.checkBoardTitle(boardName);
});

Then('both boards are displayed', (boardName: string) => {
    onMyBoardsPage.checkBoardsDisplayed(2);
});

And('the Create board option is displayed too', (boardName: string) => {
    onMyBoardsPage.checkNewBoardOption();
});