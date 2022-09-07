import { setupBoard } from '../generator/board-generator';
import { onListPage, TaskMenuOptions } from '../pages/list-page';
import { onTaskDetailsPage } from '../pages/task-details-page';

// Verify all the functionalities related with Tasks:
// -Add tasks to a list
// -Mark the task as completed
// -Drag & drop the task to another list
// -Edit the task (add description, due date and upload image)
// -Delete the task

const taskTitle = 'New Task created with cypress';
const newTaskName = 'New Name edited';
const description = 'This is my task description';
const imageName = 'Cypress.jpg';

describe('Task Tests', () => {

    describe('In Board with single list without tasks', () => {

        beforeEach(() => {
            setupBoard('Board Task Tests');
            cy.get('@boardId').then((board) => {
                cy.visit(`/board/${board}`);
            });
        });

        it('should add task to a list', () => {
            onListPage
                .checkListHaveNoTasks()
                .addNewTask(taskTitle)
                .checkListTaskLength(1);
        });

        it('should edit the task name, add a description and upload an image', () => {
            onListPage.addNewTask(taskTitle).clickOnTask();
            onTaskDetailsPage
                .editTaskName(newTaskName)
                .addTaskDescription(description)
                .attachImage(imageName)
                .clickTaskDetailsOption(TaskMenuOptions.close);
            onListPage.clickOnTask();
            onTaskDetailsPage.checkTaskEdited(newTaskName, description, imageName);
        });

        it('should delete the added task', () => {
            onListPage.addNewTask(taskTitle).clickOnTask();
            onTaskDetailsPage.clickTaskDetailsOption(TaskMenuOptions.delete);
            onListPage.checkListHaveNoTasks();
        });
    });

    describe('In Board with lists and tasks', () => {

        beforeEach(() => {
            setupBoard('Board Task Tests', 2, true);
            cy.get('@boardId').then((board) => {
                cy.visit(`/board/${board}`);
            });
        });

        it('should mark the task as completed', () => {
            onTaskDetailsPage.markTaskAsCompleted(1);
        });

        it('should drag and drop a task', () => {
            onListPage.dragFirstTaskToSecondColumn();
            cy.get('@firstTaskText').then((taskMovedTitle) => {
                cy.getElem('tasks-list').eq(0).find('[data-cy="task"] label').each((taskTitle) => {
                    expect(taskTitle, 'First column').have.length(1);
                    expect(taskTitle.text(), 'First column text').to.not.be.equal(taskMovedTitle);
                });
                cy.getElem('tasks-list').eq(1).find('[data-cy="task"]').should('have.length', 3);
            });
        });
    });
});