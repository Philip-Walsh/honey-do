Feature: Manage Todo

  Scenario: Edit an existing todo
    Given I visit the application
    When I navigate to the "Backlog" page
    And I click the "Edit" button for "Buy groceries"
    Then I should see "Update Task" heading
    When I enter "Buy organic groceries" as the task name
    And I submit the form
    Then I should be redirected to the "Backlog" page
    And I should see "Buy organic groceries" in the list

  Scenario: Delete a todo
    Given I visit the application
    When I navigate to the "Backlog" page
    And I click the "All" button
    And I should see "Walk the dog" in the list
    And I click the "Delete" button for "Walk the dog"
    Then I should not see "Walk the dog" in the list
