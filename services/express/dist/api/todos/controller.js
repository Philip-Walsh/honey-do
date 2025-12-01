"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getAllTodos = void 0;
const data_1 = require("../../data");
const mongodb_1 = require("mongodb");
const COLLECTION = 'todos';
const getAllTodos = async (req, res, next) => {
    try {
        const query = req.query;
        const filter = {};
        if (query.completed !== undefined) {
            filter.completed = query.completed === 'true';
        }
        const todos = await data_1.todosDb.findAll(COLLECTION, filter);
        res.status(200).json(todos);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTodos = getAllTodos;
const createTodo = async (req, res, next) => {
    try {
        const todo = req.body;
        const result = (await data_1.todosDb.insertOne(COLLECTION, todo));
        res.status(201).json({ ...todo, id: result.insertedId });
    }
    catch (error) {
        next(error);
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!mongodb_1.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid ID' });
            return;
        }
        await data_1.todosDb.updateOne(COLLECTION, { _id: new mongodb_1.ObjectId(id) }, { $set: updates });
        const updated = await data_1.todosDb.findOne(COLLECTION, { _id: new mongodb_1.ObjectId(id) });
        if (!updated) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(200).json(updated);
    }
    catch (error) {
        next(error);
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongodb_1.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Invalid ID' });
            return;
        }
        const result = (await data_1.todosDb.deleteOne(COLLECTION, { _id: new mongodb_1.ObjectId(id) }));
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Todo not found' });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=controller.js.map