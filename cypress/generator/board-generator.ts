import { listName, taskName } from '../fixtures/data';
import { CreationData } from '../fixtures/models/all-models';

enum CreationType {
    board = 'boards',
    list = 'lists',
    task = 'tasks',
}

function create(type: CreationType, data: CreationData): Cypress.Chainable<number> {
    const { boardId, boardName, listId, listName, taskName } = data;
    const body = {
        boards: { name: boardName },
        lists: { boardId, title: listName },
        tasks: {
            boardId,
            description: '',
            completed: false,
            listId,
            title: taskName
        }
    };

    return cy.request('POST', `/api/${type}`, body[type]).then((rq) => {
        return rq.body.id;
    });
}

export function setupBoard(boardName: string, lists = 1, withTasks = false) {
    create(CreationType.board, { boardName }).then((boardId) => {
        const array = [...taskName];
        cy.wrap(boardId).as('boardId');
        for (let i = 0; i < lists; i++) {
            create(CreationType.list, { listName: listName[i], boardId }).then((listId) => {
                if (withTasks) {
                    for (let j = 0; j < lists; j++) {
                        let random = Math.floor(Math.random() * taskName.length);
                        create(CreationType.task, { taskName: taskName[random], boardId, listId });
                        array.splice(random - 1, 1);
                    }
                }
            });
        }
    });
}