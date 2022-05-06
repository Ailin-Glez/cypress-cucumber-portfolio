const locators = {
    currentDescription: 'current-description',
    description: 'task-description',
    descriptionInput: 'task-description-input',
    imagePreview: 'imagePreview',
    optionBtn: 'task-module-close',
    taskCheckbox: 'task-done',
    taskNameEdit: 'task-module-name',
    taskTitle: 'task-title'
}

export enum TaskMenuOptions {
    close = 'Close task',
    delete = 'Delete task'
}

class TaskDetailsPage {

    addTaskDescription(description: string) {
        cy.getElem(locators.description).click();
        cy.getElem(locators.descriptionInput).type(description);
        cy.contains('Save').click();
        return this;
    }

    attachImage(imgRoute: string) {
        cy.get('.dropzone-custom-content').attachFile(imgRoute, { subjectType: 'drag-n-drop' });
        return this;
    }

    checkTaskEdited(expectedTaskName: string, expectedDescription: string, imageName: string) {
        cy.getElem(locators.currentDescription).invoke('text').then((description) => {
            expect(description.trim()).to.be.equal(expectedDescription);
        })
        cy.getElem(locators.imagePreview).find('img').invoke('attr', 'src').should('contain', imageName);
        cy.getElem(locators.taskNameEdit).should('have.value', expectedTaskName);

        return this;
    }

    clickTaskDetailsOption(option: TaskMenuOptions) {
        cy.getElem(locators.optionBtn).click();
        cy.contains('span', option).click();
        return this;
    }

    editTaskName(newName: string) {
        cy.getElem(locators.taskNameEdit).clear().type(newName).blur();
        return this;
    }

    markTaskAsCompleted(index: number) {
        cy.getElem(locators.taskCheckbox).eq(index).click().should('have.class', 'checkmark');
        cy.getElem(locators.taskTitle).eq(index).should('have.css', 'text-decoration-line', 'line-through');
    }

}

export const onTaskDetailsPage = new TaskDetailsPage();