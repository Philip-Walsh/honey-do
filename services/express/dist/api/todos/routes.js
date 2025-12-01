"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/', controller_1.getAllTodos);
router.post('/', controller_1.createTodo);
router.patch('/:id', controller_1.updateTodo);
router.delete('/:id', controller_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=routes.js.map