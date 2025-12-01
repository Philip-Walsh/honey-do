Feature: Backlog Management

  Scenario: View seeded todos in backlog
    Given I visit the application
    When I navigate to the "Backlog" page
    And I click the "All" button
    Then I should see "Buy groceries" in the list
    And I should see "Walk the dog" in the list

  Scenario: Add a new todo
    Given I visit the application
    When I navigate to the "Add Task" page
    And I enter "Cucumber Test Task" as the task name
    And I submit the form
    Then I should be redirected to the "Backlog" page
    And I should see "Cucumber Test Task" in the list
