"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosDb = exports.createDbInstance = void 0;
exports.initDb = initDb;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./db");
const init_1 = require("./init");
const mongoUri = String(process.env.DATABASE_URL);
const defaultDbName = String(process.env.DATABASE_NAME);
const createDbInstance = (dbName) => {
    return (0, db_1.makeDb)(mongoUri, dbName || defaultDbName)();
};
exports.createDbInstance = createDbInstance;
async function initDb() {
    console.log('Initializing DB');
    await (0, init_1.makeCreateIndexes)(db_1.makeDb, mongoUri, defaultDbName)('todos');
}
const todosDb = createDbInstance();
exports.todosDb = todosDb;
//# sourceMappingURL=index.js.map