Feature: Settings

  Scenario: Toggle Theme
    Given I visit the application
    When I navigate to the "Settings" page
    Then I should see "Settings" heading
    # Verify theme change logic
    When I click the theme toggle button
    Then the theme button text should change
