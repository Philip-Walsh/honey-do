"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("./todos/routes"));
const api = (0, express_1.Router)();
api.get('/', (req, res) => {
    res.status(200).send('Hello, this is the API 😁');
});
api.use('/todos', routes_1.default);
exports.default = api;
//# sourceMappingURL=index.js.map