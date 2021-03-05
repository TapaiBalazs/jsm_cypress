// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    /**
     * Exercise 4
     * Hint:
     * - Parent commands should return a 'Chainable<Subject>'
     * - Child commands should be 'void'
     */
    fillCredentials(email: string, password: string): Chainable<Subject>;
    login(): void;
  }
}

Cypress.Commands.add('fillCredentials', (email, password) => {
  cy.get(`[data-test-id="login username"]`)
    .should('be.visible')
    .and('not.be.disabled')
    .type(email);
  cy.get(`[data-test-id="login password"]`)
    .should('be.visible')
    .and('not.be.disabled')
    .type(`${password}`);
  return cy
    .get(`[data-test-id="login button"]`)
    .should('be.visible')
    .and('not.be.disabled');
});

Cypress.Commands.add('login', { prevSubject: 'element' }, (subject) => {
  subject.click();
});
