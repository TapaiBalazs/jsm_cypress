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
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    /**
     * Custom command to match image snapshots.
     * @example cy.matchImageSnapshot('greeting')
     */
    matchImageSnapshot(snapshotName?: string): void;
  }
}

addMatchImageSnapshotCommand({
  customSnapshotsDir: 'src/snapshots',
  failureThreshold: 0.05, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport' // capture viewport in screenshot
});

Cypress.Commands.overwrite('matchImageSnapshot', (originalFn, snapshotName, options) => {
  if (Cypress.env('ALLOW_SCREENSHOT')) {
    originalFn(snapshotName, options)
  } else {
    cy.log(`Screenshot comparison is disabled`);
  }
})

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => {
//   console.log('Custom command example: Login', email, password);
// });
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
