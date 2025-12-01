import { Router } from 'express';
import { makeTodosController, TodosDb } from './controller';

export const makeTodosRouter = (db: TodosDb) => {
  const router = Router();
  const controller = makeTodosController(db);

  router.get('/', controller.getAllTodos);
  router.post('/', controller.createTodo);
  router.patch('/:id', controller.updateTodo);
  router.delete('/:id', controller.deleteTodo);

  return router;
};
