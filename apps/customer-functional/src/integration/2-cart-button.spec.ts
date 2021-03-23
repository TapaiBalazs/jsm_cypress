describe(`The Cart button`, () => {
  /**
   * As you can see, there are several tests already written and marked as pending.
   * These tests verify communication between components that are far away from each other in the component tree.
   *
   * Task 4
   * Fix the beforeEach hook, and mark the tests as ready, so they can run.
   */

  beforeEach(() => {

  });

  xit(`clicking on the cart button navigates to the /cart page`, () => {
    cy.get(`[data-test-id="cart button"]`).should('be.visible').click();
    cy.url().should('contain', '/cart');
  });

  xit(`the cart button should always be visible`, () => {
    // we also test if the price gets converted to dollar amounts
    cy.get(`[data-test-id="cart button"]`)
      .should('be.visible')
      .and('have.css', 'opacity', '0.7')
      .and('contain', '$0');
  });

  xit(`pizzas can be added to the cart which updates the css`, () => {
    // we get the whole pizza row which has the data-test-id
    cy.get(`[data-test-id="Margherita"]`)
      .should('be.visible')
      .find('[data-test-id="add to cart button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    cy.get(`[data-test-id="cart button"]`)
      .should('be.visible')
      .and('have.css', 'opacity', '1')
      .and('contain', '$12.90');
  });

  xit(`adding multiple pizzas sums up the order price`, () => {
    // we get the whole pizza row which has the data-test-id
    cy.get(`[data-test-id="Margherita"]`)
      .should('be.visible')
      .find('[data-test-id="add to cart button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    cy.get(`[data-test-id="Piccante"]`)
      .should('be.visible')
      .find('[data-test-id="add to cart button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
    cy.get(`[data-test-id="cart button"]`)
      .should('be.visible')
      .and('contain', '$27.70');
  });
});
