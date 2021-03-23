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

  describe(`when there is a proper pizza list response`, () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/pizza/list', { fixture: 'pizzas.json' }).as('pizzas');
      cy.intercept('GET', '/api/pizza/images/*.jpg', { fixture: 'pizza.jpg' }).as('pizzaImage');
      cy.visit('/pizza');
      cy.wait('@pizzas');
    });

    it(`should display the Margherita pizza`, () => {
      cy.get(`[data-test-id="Margherita"]`)
        .as('margherita')
        .should('be.visible');

      cy.get('@margherita')
        .find(`img`)
        .should('exist')
        .and('be.visible')
        .and('have.attr', 'src', '/api/pizza/images/1.jpg');

      cy.get('@margherita')
        .find('[data-test-id="add to cart button"]')
        .should('be.visible')
        .and('not.be.disabled');
    });
  });

  describe(`when an error occurs`, () => {
    it(`as an unknown server error`, () => {
      cy.intercept('GET', '/api/pizza/list', { statusCode: 500 }).as('serverError');
      cy.visit('/');
      cy.wait('@serverError');

      cy.get(`[data-test-id="server error"]`)
        .should('exist')
        .and('be.visible')
        .and('contain', 'Sorry, an unexpected error occurred!');
    });

    it(`as a network error`, () => {
      cy.intercept('GET', '/api/pizza/list', { forceNetworkError: true }).as('networkError');
      cy.visit('/');
      cy.wait('@networkError');

      cy.get(`[data-test-id="server error"]`)
        .should('exist')
        .and('be.visible')
        .and('contain', 'Sorry, an unexpected error occurred!');
    });
  });
});
