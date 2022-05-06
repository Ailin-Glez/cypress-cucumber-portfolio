const locators = {
    newTask: {
        addBtn: 'add-task',
        newBtn: 'new-task',
        input: 'task-input',
    },
    lists: 'tasks-list',
    tasks: 'task'
}

export enum TaskMenuOptions {
    close = 'Close task',
    delete = 'Delete task'
}

class ListPage {

    addNewTask(name: string) {
        cy.getElem(locators.newTask.newBtn).click();
        cy.getElem(locators.newTask.input).type(name);
        cy.getElem(locators.newTask.addBtn).click();
        return this;
    }

    checkListTaskLength(expected: number) {
        cy.getElem(locators.lists).should('have.length', expected);
        return this;
    }

    checkListHaveNoTasks() {
        cy.getElem(locators.lists).find('div').should('not.exist');
        return this;
    }

    clickOnTask(index = 0) {
        cy.getElem('task').eq(index).click({ force: true });
        return this;
    }

    dragFirstTaskToSecondColumn() {
        cy.getElem(locators.tasks).eq(0).as('firstTask').find('label').invoke('text').as('firstTaskText');
        cy.getElem(locators.lists).eq(1).as('secondList');
        cy.get('@firstTask').drag('@secondList');
        return this;
    }

}

export const onListPage = new ListPage();