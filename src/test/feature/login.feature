Feature: User Authentication tests

Background: 
    Given User navigates to the application
    And User clicks on the login link

Scenario: Login should be success
    Given User enters the name as "Thoushi"
    And User enters the password as "Thou@123"
    When User clicks on the login button
    Then Login should be success

Scenario: Login should not be success
    Given User enters the name as "Thoushi"
    And User enters the password as ""
    When User clicks on the login button
    Then Login should fail