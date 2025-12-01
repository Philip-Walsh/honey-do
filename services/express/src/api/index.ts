import { Router } from 'express';
import { makeTodosRouter } from './todos/routes';
import { TodosDb } from './todos/controller';

export const makeApi = (db: TodosDb) => {
  const api = Router();

  api.get('/', (req, res) => {
    res.status(200).send('Hello, this is the API 😁');
  });

  api.use('/todos', makeTodosRouter(db));

  return api;
};
