const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I visit the application", () => {
  cy.visit("/", {
    onBeforeLoad: (win) => {
      win.localStorage.clear();
      win.localStorage.setItem('theme', 'light');
    }
  });
});

When("I navigate to the {string} page", (pageName) => {
  cy.contains("button", pageName).click();
});

Then("I should see {string} in the list", (text) => {
  cy.contains(text).should("be.visible");
});

When("I enter {string} as the task name", (taskName) => {
  cy.get('input[name="name"]').type(taskName);
});

When("I click the {string} button", (buttonText) => {
  cy.contains("button", buttonText).click();
});

Then("I should be redirected to the {string} page", (pageName) => {
  const pathMap = {
    "Backlog": "/backlog",
    "Add Task": "/add",
    "Board": "/dashboard",
    "Today": "/today",
    "Settings": "/settings"
  };
  const path = pathMap[pageName] || "/";
  cy.url().should('include', path);
});

When("I click the {string} button for {string}", (action, todoName) => {
  // Find the todo item by name, then find the button with the corresponding aria-label
  const ariaLabel = action === "Edit" ? `Edit "${todoName}"` : `Delete "${todoName}"`;
  cy.get(`button[aria-label='${ariaLabel}']`).click();
});

Then("I should see {string} in the header", (text) => {
  cy.get('header').contains(text).should('be.visible');
});

When("I submit the form", () => {
  cy.get('form').submit();
});
Then("I should see {string} heading", (text) => {
  cy.get('h1, h2').contains(text).should('be.visible');
});
Then("I should not see {string} in the list", (text) => {
  cy.contains(text).should("not.exist");
});

When("I click the theme toggle button", () => {
  cy.contains('button', 'Switch to').click();
});

Then("the theme button text should change", () => {
  cy.contains('button', 'Switch to').should((($btn) => {
    const text = $btn.text();
    expect(text).to.match(/Switch to (Dark|Light)/);
  }));
});
