// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(pageUrl: string): void;
  }
}

// -- This is a parent command --
Cypress.Commands.add('login', (pageUrl: string) => {
  cy.request('POST', `${Cypress.env('BACKOFFICE')}api/login`, {
    username: 'testuser',
    password: 'pass',
  }).then((response) => {
    cy.visit(Cypress.env('BACKOFFICE') + pageUrl, {
      onBeforeLoad: (window) => {
        window.sessionStorage.setItem('AUTH_TOKEN', response.body.accessToken);
      },
    });
  });
});
