# Honey-Do E2E Tests

End-to-end tests for the Honey-Do application using Cypress.

## Prerequisites

- Docker Compose running all services
- Application accessible at http://localhost

## Running Tests

Install dependencies:
```bash
npm install
```

Run tests headlessly:
```bash
npm test
```

Open Cypress UI:
```bash
npx cypress open
```

## Test Structure

Tests are located in the `cypress/` directory and cover:
- Task creation and management
- Kanban board interactions
- UI functionality across different pages
- Integration between frontend and backend
