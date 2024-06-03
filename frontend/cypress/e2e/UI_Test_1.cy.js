// For the happy path of an admin
describe('Happy path of an admin', () => {
  it('Happy Path', () => {
    // Register
    cy.visit('http://localhost:3000/register');
    const name = 'John';
    const email = 'john@johnsemails.com';
    const password = 'john123';
    const dashboardText = 'No Presentations';

    cy.get('#formBasicEmail')
      .focus()
      .type(email);

    cy.get('#formBasicName')
      .focus()
      .type(name);

    cy.get('#formBasicPassword')
      .focus()
      .type(password);

    cy.get('#formConfirmPassword')
      .focus()
      .type(password);

    cy.get('.btn')
      .click();

    cy.get('h3')
      .should('be.visible')
      .should('contain', dashboardText);

    // Create presentation
    const presentationName = 'Cool Presentation!';
    const presentationDescription = 'We love COMP6080!!!!';

    cy.get('button:contains("New presentation")')
      .click();

    cy.get('#formPresentationName')
      .focus()
      .type(presentationName);

    cy.get('#formPresentationDescription')
      .focus()
      .type(presentationDescription);

    cy.get('button:contains("Create")')
      .click();

    cy.get('button:contains("Go to presentation")')
      .should('be.visible')
      .click();

    // Updates name of presentation
    cy.get('h3')
      .should('be.visible')
      .should('contain', presentationName);

    cy.get('button:contains("Edit Title")')
      .click();

    const newName = 'Not cool presentation';
    cy.get('#formNewTitle')
      .should('be.visible')
      .focus()
      .clear()
      .type(newName);

    cy.get('button:contains("Submit")')
      .click();

    cy.get('h3')
      .should('be.visible')
      .should('contain', newName);

    // Updates thumbnail of presentation
    cy.get('button:contains("Change Thumbnail")')
      .click();

    const thumbnailUrl = 'https://ih0.redbubble.net/image.1539860728.6102/raf,360x360,075,t,fafafa:ca443f4786.jpg';
    cy.get('#formNewThumbnailUrl')
      .should('be.visible')
      .focus()
      .clear()
      .type(thumbnailUrl);

    cy.get('button:contains("Submit")')
      .click();

    // Adds new slide in presentation
    cy.get('.slide-number-container')
      .should('be.visible')
      .should('contain', 1);

    cy.get('button:contains("New slide")')
      .click();

    cy.get('.slide-number-container')
      .should('contain', 2);

    // Switches between different slides
    cy.get('button:contains("<")')
      .click();

    cy.get('.slide-number-container')
      .should('be.visible')
      .should('contain', 1);

    cy.get('button:contains(">")')
      .click();

    cy.get('.slide-number-container')
      .should('be.visible')
      .should('contain', 2);

    // Deletes presentation
    cy.get('button:contains("Delete Presentation")')
      .click();

    cy.get('button:contains("Yes")')
      .click();

    cy.get('button:contains("Go to presentation")')
      .should('not.exist');

    // Logs out
    cy.get('button:contains("Logout")')
      .click();

    cy.get('#formBasicEmail')
      .should('be.visible');

    // Logs back in
    cy.get('#formBasicEmail')
      .focus()
      .type(email);

    cy.get('#formBasicPassword')
      .focus()
      .type(password);

    cy.get('.btn')
      .click();

    cy.get('h3')
      .should('be.visible')
      .should('contain', dashboardText);
  })
});
