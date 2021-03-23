import AUTWindow = Cypress.AUTWindow;

describe(`The Cart page`, () => {
  /**
   * As you can see, there are several tests which test the cart page functionality.
   *
   * Task 5
   * Write a test that verifies that when a successful order is placed (the order's id gets returned),
   * the application redirects to the '/success' page and the user is ensured that their order is on its way.
   *
   * Task 6
   * Write a test that verifies that when an error occurs, the user gets redirected to the '/error' page and the cart
   * content does not get cleared.
   *
   */

  describe(`with an empty cart`, () => {
    beforeEach(() => {
      cy.visit('/cart');
    });

    it(`The 'Place order' button should be disabled`, () => {
      cy.get(`[data-test-id="place order"]`)
        .should('be.visible')
        .and('be.disabled');
    });

    it(`asks the user to put a pizza into the cart`, () => {
      cy.get(`[data-test-id="empty order message"]`)
        .should('be.visible')
        .and('contain', 'Please, place an order first.');
    });
  });

  describe(`with cart contents`, () => {
    const MOCK_CART_CONTENT = [
      {
        id: 2,
        name: 'Prosciutto',
        price: 1345,
        imageUrl: '/api/pizza/images/2.jpg',
        description: 'Tomato sauce, ham, mozzarella, oregano',
      },
      {
        id: 3,
        name: 'Diavola',
        price: 1345,
        imageUrl: '/api/pizza/images/3.jpg',
        description: 'Tomato sauce, Italian spicy salami, mozzarella',
      },
    ];

    beforeEach(() => {
      // we start the tests with setting a cart content up first
      cy.visit('/cart', {
        onBeforeLoad: (window: AUTWindow) => {
          window.localStorage.setItem(
            'cart',
            JSON.stringify(MOCK_CART_CONTENT)
          );
        },
      });
    });

    it(`without an address, the 'Place order' button should be disabled`, () => {
      cy.get(`[data-test-id="place order"]`)
        .should('be.visible')
        .and('be.disabled');
    });

    it(`refreshing the page should keep the cart contents`, () => {
      cy.get(`[data-test-id="cart button"]`)
        .should('be.visible')
        .and('contain', '$26.90');
      cy.reload();
      cy.get(`[data-test-id="cart button"]`)
        .should('be.visible')
        .and('contain', '$26.90');
    });

    it(`clicking on the Remove button removes the order`, () => {
      cy.get(`[data-test-id="order_Prosciutto"]`)
        .should('be.visible')
        .find('[data-test-id="remove from cart button"]')
        .should('be.visible')
        .and('not.be.disabled')
        .click();
      cy.get(`[data-test-id="cart button"]`)
        .should('be.visible')
        .and('contain', '$13.45');
    });

    describe(`placing an order`, () => {
      beforeEach(() => {
        cy.get('#city')
          .should('be.visible')
          .and('not.disabled')
          .type(`Gotham`);

        cy.get('#street')
          .should('be.visible')
          .and('not.disabled')
          .type(`Crime Alley 32.`);

        cy.get('#payment_method')
          .should('be.visible')
          .and('not.disabled')
          .select('CARD');
      });

      it(`a successful order navigates to the /success page and clears the cart contents`, () => {
        cy.intercept('POST', '/api/order', { body: 1 }).as('orderRequest');

        cy.get(`[data-test-id="place order"]`)
          .should('be.visible')
          .and('not.be.disabled')
          .click();

        cy.wait('@orderRequest')
          .its('request.body').should('deep.include', {
          address: 'Gotham, Crime Alley 32.',
          paymentType: 'CARD'
        });
        cy.url().should('contain', '/success');

        cy.get(`[data-test-id="success message"]`)
          .should('be.visible')
          .and('contain', 'Your order is on its way!');

        cy.get(`[data-test-id="cart button"]`)
          .should('be.visible')
          .and('have.css', 'opacity', '0.7')
          .and('contain', '$0');
      });

      it(`when an error occurs, user should be redirected to the error page with the cart contents kept`, () => {
        cy.intercept('POST', '/api/order', { forceNetworkError: true }).as('orderRequest');

        cy.get(`[data-test-id="place order"]`)
          .should('be.visible')
          .and('not.be.disabled')
          .click();

        cy.wait('@orderRequest')
          .its('request.body').should('deep.include', {
          address: 'Gotham, Crime Alley 32.',
          paymentType: 'CARD'
        });

        cy.url().should('contain', '/error');

        cy.get(`[data-test-id="error message"]`)
          .should('be.visible')
          .and('contain', 'Sorry, an unexpected error occurred. Please try again later.');

        cy.get(`[data-test-id="cart button"]`)
          .should('be.visible')
          .and('have.css', 'opacity', '1')
          .and('contain', '$26.90');
      });

    });
  });
});
