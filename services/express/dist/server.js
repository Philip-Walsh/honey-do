"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const middlewares_1 = require("./middlewares");
const data_1 = require("./data");
dotenv_1.default.config();
class Server {
    app;
    port;
    serverInstance;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT) || 3001;
        this.setupMiddlewares();
    }
    setupMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use('/', api_1.default);
        this.app.use(middlewares_1.validateRequest);
        this.app.use(middlewares_1.errorHandler);
        this.app.use(middlewares_1.notFound);
    }
    async start() {
        await this.startDb();
        this.serverInstance = this.app.listen(this.port, () => {
            console.log(`Server is running on port: ${this.port}`);
        });
    }
    async startDb() {
        try {
            await (0, data_1.initDb)();
            console.log('Database initialized successfully.');
        }
        catch (error) {
            console.error('Failed to initialize the database:', error);
        }
    }
    close() {
        if (this.serverInstance) {
            console.log('Shutting down server...');
            this.serverInstance.close(() => {
                console.log('Server closed.');
                process.exit(0);
            });
        }
    }
    getApp() {
        return this.app;
    }
}
const server = new Server();
if (require.main === module) {
    server.start();
}
process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
exports.default = server;
//# sourceMappingURL=server.js.map