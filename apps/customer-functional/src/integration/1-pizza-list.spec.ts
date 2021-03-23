describe(`Pizza interceptors`, () => {
  /**
   * Task 1
   * Write a test that verifies that when an empty list gets returned, the "no delivery" message is displayed
   *
   * Task 2
   * Write a test that verifies that when a list of pizzas gets returned (fixtures/pizzas.json), the pizzas are displayed on the page
   *
   * Task 3
   * Write two tests that verifies that when a network error or an unexpected server error occurs, an error message is displayed to the user.
   */

  describe(`when there is an empty pizza list response`, () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/pizza/list', { body: [] }).as('emptyList');
      cy.visit('/');
      cy.wait('@emptyList');
    });

    it(`a message should be displayed`, () => {
      cy.get(`[data-test-id="no delivery"]`)
        .should('exist')
        .and('be.visible')
        .and('contain', 'Sorry, but we are not delivering pizzas at the moment.');
    });
  });

});
