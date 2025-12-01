import { Request, Response, NextFunction } from 'express';

import { ObjectId } from 'mongodb';
import { Todo } from './model';

const COLLECTION = 'todos';

export interface TodosDb {
  findAll: (collection: string, query: any) => Promise<any[]>;
  findOne: (collection: string, query: any) => Promise<any>;
  insertOne: (collection: string, doc: any) => Promise<any>;
  updateOne: (collection: string, query: any, update: any) => Promise<any>;
  deleteOne: (collection: string, query: any) => Promise<any>;
  findOneAndUpdate: (collection: string, query: any, update: any, options?: any) => Promise<any>;
}

export const makeTodosController = (db: TodosDb) => {
  return {
    getAllTodos: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const query = req.query;
        const filter: any = {};
        
        if (query.completed !== undefined) {
          filter.completed = query.completed === 'true';
        }

        const todos = await db.findAll(COLLECTION, filter);
        res.status(200).json(todos);
      } catch (error) {
        next(error);
      }
    },

    createTodo: async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Get next sequence number
        const counter = await db.findOneAndUpdate(
          'counters',
          { _id: 'todos' },
          { $inc: { seq: 1 } },
          { upsert: true, returnDocument: 'after' }
        );
        
        const seq = counter?.seq || 1; // Fallback if something goes wrong, though upsert should handle it

        const todo: Todo = { ...req.body, createdOn: new Date(), seq };
        const result = (await db.insertOne(COLLECTION, todo)) as any;
        res.status(201).json({ ...todo, id: result.insertedId });
      } catch (error) {
        next(error);
      }
    },

    updateTodo: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const updates: Partial<Todo> = req.body;
        
        if (!ObjectId.isValid(id)) {
          res.status(400).json({ message: 'Invalid ID' });
          return;
        }
        
        await db.updateOne(COLLECTION, { _id: new ObjectId(id) }, { $set: { ...updates, updatedOn: new Date() } });
        
        const updated = await db.findOne(COLLECTION, { _id: new ObjectId(id) });

        if (!updated) {
          res.status(404).json({ message: 'Todo not found' });
          return;
        }

        res.status(200).json(updated);
      } catch (error) {
        next(error);
      }
    },

    deleteTodo: async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          res.status(400).json({ message: 'Invalid ID' });
          return;
        }

        const result = (await db.deleteOne(COLLECTION, { _id: new ObjectId(id) })) as any;

        if (result.deletedCount === 0) {
          res.status(404).json({ message: 'Todo not found' });
          return;
        }

        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }
  };
};
