/**
 * Intercept is an important tool for e2e tests as well. With its help you can avoid timing issues,
 * simply with intercepting requests, allowing them to pass through and wait for them using cy.wait()
 */

describe('Orders', () => {
  after(() => {
    cy.request('POST', Cypress.env('API') + 'api/clear-db');
  });

  describe(`Step 1 - Admin page`, () => {
    it(`at start, the orders page is empty`, () => {
      cy.login('admin/orders');
      cy.get('h2').should('be.visible').and('contain', 'No orders.');
    });
  });

  describe(`Step 2 - Customer pages`, () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/pizza/list').as('pizzas');
      cy.intercept('GET', '/api/pizza/images/*.jpg').as('pizzaImage');
      cy.intercept('POST', '/api/order').as('orderRequest');

      cy.visit(Cypress.env('CUSTOMER'));
      cy.wait('@pizzas');
    });

    it('user can retrieve a list of pizzas and place an order', () => {
      // we get the whole pizza row which has the data-test-id
      cy.get(`[data-test-id="Margherita"]`)
        .as('margherita')
        .should('be.visible');

      // we search for the img tag inside the component.
      cy.get('@margherita')
        .find(`img`)
        // ensures that the tag is present in the DOM
        .should('exist')
        // if we don't stub the /api/pizza/images/*.jpg call, this would fail the test
        .and('be.visible')
        .and('have.attr', 'src', '/api/pizza/images/1.jpg');

      // We check the add to cart button as well, and make sure it is not disabled
      cy.get('@margherita')
        .find('[data-test-id="add to cart button"]')
        .should('be.visible')
        .and('not.be.disabled')
        .click();

      cy.get(`[data-test-id="cart button"]`)
        .should('be.visible')
        .and('have.css', 'opacity', '1')
        .and('contain', '$12.90')
        .click();

      cy.url().should('contain', 'cart');

      cy.get('#city').should('be.visible').and('not.disabled').type(`Gotham`);

      cy.get('#street')
        .should('be.visible')
        .and('not.disabled')
        .type(`Crime Alley 32.`);

      cy.get('#payment_method')
        .should('be.visible')
        .and('not.disabled')
        .select('CARD');

      cy.get(`[data-test-id="place order"]`)
        .should('be.visible')
        .and('not.be.disabled')
        .click();

      cy.wait('@orderRequest').its('request.body').should('deep.include', {
        address: 'Gotham, Crime Alley 32.',
        paymentType: 'CARD'
      });

      cy.url().should('contain', '/success');

      cy.get(`[data-test-id="success message"]`)
        .should('be.visible')
        .and('contain', 'Your order is on its way!');
    });
  });

  describe(`Step 3 - Admin page`, () => {
    it(`The recently placed order is visible in the orders list`, () => {
      cy.intercept('GET', 'api/orders').as('orders');

      cy.login('admin/orders');

      cy.wait('@orders').its('response.body.length').should('equal', 1)

      cy.get('h2').should('not.exist');

      cy.get(`[data-test-id="order item 1"]`)
        .should('be.visible')
        .find('summary')
        .should('contain', '$12.90, CARD - Address: Gotham, Crime Alley 32.')
        .click();

      cy.get(`[data-test-id="order item 1"]`)
        .find(`[data-test-id="Margherita"]`)
        .should('be.visible');
    });
  });
});
