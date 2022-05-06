/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.getElem('locator')
       */
      getElem(element: string): Chainable<Element>;
      /**
       * Custom command to delete all Boards using the boardIds
       * @example cy.deleteAllBoards([12345, 98562, 32652])
       */
       deleteAllBoards(boardId: number[]): void;
    }
  }