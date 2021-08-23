Feature: Creating a new board

    Verify that the user can create boards
    Scenario: Check the creation of a new board
        Given I have no boards
        When I enter "First Board" as board name
        And I click on the Save button
        Then the board screen is displayed with the name "First Board"

    Scenario: Check the creation of multiple boards
        Given I have no boards
        When I create multiple boards with the names:
            | Board #1 |
            | Board #2 |
        Then both boards are displayed
        And the Create board option is displayed too
