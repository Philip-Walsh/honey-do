# Honey-Do

A simple task management app for tracking your to-do list with a Kanban-style interface.

## Features

- **Kanban Board**: Drag-and-drop tasks between TODO, In Progress, and Done columns
- **Task Management**: Create, update, delete, and toggle tasks
- **Task Details**: Add descriptions, due dates, tags, assignees, priorities, and locations
- **Recurring Tasks**: Set up daily, weekly, monthly, or yearly recurring tasks
- **Dark/Light Theme**: Toggle between dark and light modes
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js/Express with TypeScript
- **Database**: MongoDB
- **Proxy**: Nginx reverse proxy
- **Testing**: Jest (backend), React Testing Library (frontend), Cypress (e2e)
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 22+ (for local development)

### Running with Docker

```bash
docker-compose up
```

The application will be available at:
- Frontend: http://localhost (via Nginx)
- Backend API: http://localhost:3001
- MongoDB: localhost:27017

### Local Development

See individual service READMEs for development setup:
- [Frontend (React)](./services/react/README.md)
- [Backend (Express)](./services/express/README.md)
- [E2E Tests](./e2e/README.md)

## Project Structure

```
honey-do/
├── services/
│   ├── react/          # React frontend
│   ├── express/        # Express backend API
│   └── nginx/          # Nginx reverse proxy
├── e2e/                # Cypress end-to-end tests
└── docker-compose.yml  # Docker Compose configuration
```

## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## License

ISC
