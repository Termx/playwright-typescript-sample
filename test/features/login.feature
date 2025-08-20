Feature: User Login


Scenario: User should be able to sign in successfully
    Given Navigate to the homepage
    When I perform Login steps
    Then I should see the user account page

Scenario: Unsuccessful login with invalid credentials
    Given Navigate to the homepage
    When I perform Login with invalid credentials
    Then I should see an error message indicating invalid credentials

Scenario: Able to see an error message when an email and password is not provided
    Given Navigate to the homepage
    When I perform Login without an email and password
    Then I should see an error message indicating that the email is required
    And I should see an error message indicating that the password is required