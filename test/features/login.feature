Feature: User Login

Background: Proceed to the Login page
    Given I navigate to the login page

    Scenario: User should be able to sign in successfully
        When I enter valid credentials
        Then I should see the user account page

    Scenario: Unsuccessful login with invalid credentials
        When I perform Login with invalid credentials
        Then I should see an error message indicating invalid credentials

    Scenario: Able to see an error message when an email and password is not provided
        When I perform Login without an email and password
        Then I should see an error message indicating that the email is required
        And I should see an error message indicating that the password is required

    Scenario: Able to request a password reset
        When I request a password reset
        Then I should see a password reset confirmation message

    Scenario: Unable to request a password reset with an invalid email
        When I request a password reset with an invalid email
        Then I should see password reset field display an invalid error message
    Scenario: Unable to request a password reset without an email address
        When I request a password reset without an email address
        Then I should see password reset field display an error message