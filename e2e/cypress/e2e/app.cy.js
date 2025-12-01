describe('Honey-Do App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the application', () => {
    cy.get('h1').should('contain', 'Honey-Do');
  });

  it('should display seeded todos', () => {
    cy.contains('button', 'Backlog').click();
    cy.contains('Buy groceries').should('be.visible');
  });

  it('should add a new todo', () => {
    const newTodo = 'Test E2E Todo ' + Date.now();
    
    cy.contains('button', 'Add Task').click();
    
    cy.get('input[aria-label="Task name"]').type(newTodo);
    cy.get('textarea[aria-label="Task description"]').type('Description for ' + newTodo);
    
    cy.contains('button', 'Add Task').click();
    
    cy.contains('button', 'Backlog').click();
    cy.contains(newTodo).should('be.visible');
  });
});
