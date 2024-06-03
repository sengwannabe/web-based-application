/// <reference types='cypress' />

// Function checks error modal message then closes it
Cypress.Commands.add('checkError', (errorString) => {
  cy.get('.modal-body')
    .should('be.visible')
    .should('contain', errorString);

  cy.get('button:contains("Close")')
    .click();
});
