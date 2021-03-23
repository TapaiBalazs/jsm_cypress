import AUTWindow = Cypress.AUTWindow;

describe(`Login`, () => {
  /**
   * As you can see there is already a test, which verifies that the user gets redirected without an active login.
   *
   * Note:
   * There are two custom commandds set up for you already for filling the login form and clicking on the login button:
   * "cy.fillCredentials('user', 'password').login();
   *
   * Task 7
   * Write a test that verifies when the user tries to log in without valid credentials (login endpoint returns 401),
   * they stay on the login page, and a login credentials error is displayed in red.
   *
   * Task 8
   * Write a test that verifies when the user logs in with valid credentials (200 and { accessToken: string }),
   * they get redirected to the '/dashboard' page.
   */

  beforeEach(() => {
    cy.visit('/dashboard', {
      onBeforeLoad: (win: AUTWindow) => {
        win.sessionStorage.clear();
      },
    });
  });

  it(`without an active login, the application redirects to the login page`, () => {
    cy.url().should('contain', 'login');
  });

  describe(`with invalid credentials`, () => {
    it(`displays an error message`, () => {
      cy.intercept('POST', '/api/login', { statusCode: 401 }).as('login');

      cy.get(`[data-test-id="login credentials error"]`)
        .should('not.exist');

      cy.fillCredentials('Oregano', 'basil')
        .login();
      cy.get(`[data-test-id="login credentials error"]`)
        .should('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    });
  });

  describe(`with valid credentials`, () => {
    it(`navigates the user to the dashboard`, () => {
      cy.intercept('POST', '/api/login', { body: { accessToken: `${new Date().getTime()}`} }).as('login');

      cy.get(`[data-test-id="login credentials error"]`)
        .should('not.exist');

      cy.fillCredentials('Oregano', 'basil')
        .login();
      cy.url().should('contain', '/admin/dashboard');
    });
  });

});
