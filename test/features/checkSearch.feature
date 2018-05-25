@Component=basic
Feature: Access streeteasy.com website & search a real state for sale

Scenario: Open StreetEasy WebPage and search real state
    Given Load basic url
    When Search [Location], [Custom] for a start value of [Price]
    Then I validate that first element showed is according to criteria to [Price]

Where:
| paramWeb      |Location |Custom|Price     |
| StreetEasy    |Manhattan|Yes   |80,000,000|