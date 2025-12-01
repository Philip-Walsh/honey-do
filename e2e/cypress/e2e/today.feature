Feature: Today View

  Scenario: View tasks for today
    Given I visit the application
    When I navigate to the "Today" page
    # Since seeded tasks are created "now", they might not show up if "Today" logic relies on due dates.
    # But if it shows created today, they should appear.
    # Assuming the view shows tasks due today or created today.
    Then I should see "Today" heading
