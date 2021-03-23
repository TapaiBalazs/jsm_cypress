import AUTWindow = Cypress.AUTWindow;

describe(`Order list page`, () => {
  /**
   * As you can see, there are tests set up for testing the orders page with an active token
   *
   * Task 9
   * Write a test that simulates that the user visits the orders page after a certain amount of inactivity.
   * (orders request should return 403)
   *
   */

  describe(`with active token`, () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/orders', { fixture: 'orders.json' }).as(
        'orders'
      );

      cy.visit('/admin/orders', {
        onBeforeLoad: (window: AUTWindow) => {
          window.sessionStorage.setItem(
            'AUTH_TOKEN',
            `${new Date().getTime()}`
          );
        },
      });
      cy.wait('@orders');
    });

    it(`displays the orders`, () => {
      cy.get(`[data-test-id="order item 1"]`)
        .should('be.visible')
        .find('summary')
        .should('contain', '$26.90, CARD - Address: Gotham, Crime Alley 32.');

      cy.get(`[data-test-id="order item 2"]`)
        .should('be.visible')
        .find('summary')
        .should('contain', '$13.45, CASH - Address: Gotham, Arkham street 92');
    });

    it(`the orders contain the ordered pizzas`, () => {
      cy.get(`[data-test-id="order item 1"]`)
        .should('be.visible')
        .find('summary')
        .click();
      cy.get(`[data-test-id="order item 1"]`)
        .find(`[data-test-id="Diavola"]`)
        .should('be.visible');
    });
  });

  describe(`with an expired token`, () => {
    it(`the user gets redirected to the '/login' page`, () => {
      cy.intercept('GET', 'api/orders', { statusCode: 403 }).as('orders');

      cy.visit('/admin/orders', {
        onBeforeLoad: (window: AUTWindow) => {
          window.sessionStorage.setItem('AUTH_TOKEN', `${new Date().getTime()}`);
        }
      });

      cy.wait('@orders');

      cy.url().should('contain', '/login');
      cy.window().then((window: AUTWindow) => {
        expect(window.sessionStorage.getItem('AUTH_TOKEN')).to.equal(null)
      })
    });
  });
});
