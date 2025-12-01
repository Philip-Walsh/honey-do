# Honey-Do API

Express backend API for the Honey-Do task management application.

## Tech Stack

- Node.js with Express
- TypeScript
- MongoDB for data persistence
- Jest for testing

## Development

Install dependencies:
```bash
npm install
```

Run development server with hot reload:
```bash
npm run start:dev
```

The API will be available at [http://localhost:3001](http://localhost:3001)

## Environment Variables

Create a `.env` file or set these environment variables:

```
PORT=3001
DATABASE_URL=mongodb://localhost:27017
DATABASE_NAME=honey-do
```

## Available Scripts

- `npm run start:dev` - Run development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm test` - Run all tests (unit + integration)
- `npm run test:unit` - Run unit tests only
- `npm run test:integration` - Run integration tests only
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Check code style
- `npm run lint:fix` - Fix code style issues
- `npm run seed` - Seed database with sample data

## Project Structure

```
src/
├── api/              # API routes and controllers
│   └── todos/        # Todo endpoints
├── data/             # Database connection and utilities
├── middlewares/      # Express middlewares
├── scripts/          # Utility scripts (seeding, etc.)
└── utils/            # Helper functions
```

## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo by ID
- `DELETE /todos/:id` - Delete a todo by ID

## Testing

Unit tests:
```bash
npm run test:unit
```

Integration tests (requires MongoDB):
```bash
npm run test:integration
```
