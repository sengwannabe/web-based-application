// For the unhappy path of an admin
describe('Unhappy path of an admin', () => {
  it('Happy Path', () => {
    // Register, non matching passwords first then matching
    cy.visit('http://localhost:3000/register');
    const name = 'Alec Leamas';
    const email = 'email@email.com';
    const passwordReal = 'smith';
    const passwordFake = 'winston';

    cy.get('#formBasicEmail')
      .focus()
      .type(email);

    cy.get('#formBasicName')
      .focus()
      .type(name);

    cy.get('#formBasicPassword')
      .focus()
      .type(passwordReal);

    cy.get('#formConfirmPassword')
      .focus()
      .type(passwordFake);

    cy.get('.btn')
      .click();

    const passwordError = 'Confirmed password does not match';
    cy.checkError(passwordError);

    cy.get('#formConfirmPassword')
      .focus()
      .clear()
      .type(passwordReal);

    cy.get('.btn')
      .click();

    const dashboardText = 'No Presentations';

    cy.get('h3')
      .should('be.visible')
      .should('contain', dashboardText);

    // Create presentation, empty name first, then valid name
    cy.get('button:contains("New presentation")')
      .click();

    cy.get('button:contains("Create")')
      .click();

    const presentationError = 'Presentation name cannot be empty.';
    cy.checkError(presentationError);

    const presentationName = 'Please give good marks!';
    cy.get('#formPresentationName')
      .focus()
      .type(presentationName);

    cy.get('button:contains("Create")')
      .click();

    cy.get('button:contains("Go to presentation")')
      .should('be.visible')
      .click();

    // Try add text box with invalid HEX colour, then valid HEX
    const invalidHex = '#11111';
    const validHex = '#111111';
    cy.get('h3')
      .should('be.visible')
      .should('contain', presentationName);

    cy.get('button:contains("Add Text")')
      .click();

    const text = 'I wish!';
    cy.get('#formText')
      .should('be.visible')
      .focus()
      .type(text);

    cy.get('#formTextColour')
      .should('be.visible')
      .focus()
      .type(invalidHex);

    cy.get('button:contains("Add Element")')
      .click();

    const hexError = 'Invalid HEX value!';
    cy.checkError(hexError);

    cy.get('#formTextColour')
      .focus()
      .clear()
      .type(validHex);

    cy.get('button:contains("Add Element")')
      .click();

    // Attempt to edit textbox and make the font size empty
    cy.get('[style="width: 100%; height: 100%; border: 1px solid grey; font-size: 1em; color: rgb(17, 17, 17); overflow: hidden;"]')
      .should('be.visible')
      .click();

    cy.get('.react-draggable')
      .should('be.visible')
      .dblclick();

    cy.get('#formFontSize')
      .should('be.visible')
      .focus()
      .clear();

    cy.get('button:contains("Update Element")')
      .click();

    const invalidFontSize = 'Font size cannot be less than 0 or empty!';
    cy.checkError(invalidFontSize);

    cy.get('.btn-close')
      .first()
      .click();

    // Logs out
    cy.get('button:contains("Logout")')
      .click();

    cy.get('#formBasicEmail')
      .should('be.visible');

    // Attempts to log back in with invalid password
    cy.get('#formBasicEmail')
      .focus()
      .type(email);

    cy.get('#formBasicPassword')
      .focus()
      .type(passwordFake);

    cy.get('.btn')
      .click();

    const invalidLogin = 'Invalid username or password'
    cy.checkError(invalidLogin);
  })
});
