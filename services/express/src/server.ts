import express, { Application } from 'express';
import { makeApi } from './api';
import cors from 'cors';
import dotenv from 'dotenv';
import { validateRequest, errorHandler, notFound } from './middlewares';
import { initDb, todosDb } from './data';

dotenv.config();

class Server {
  private app: Application;
  private port: number;
  private serverInstance?: ReturnType<Application['listen']>;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3001;
    this.setupMiddlewares();
  }

  private setupMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/', makeApi(todosDb));
    this.app.use(validateRequest);
    this.app.use(errorHandler);
    this.app.use(notFound);
  }

  public async start(): Promise<void> {
    await this.startDb();
    this.serverInstance = this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`);
    });
  }
  public async startDb() {
    try {
      await initDb();
      console.log('Database initialized successfully.');
    } catch (error) {
      console.error('Failed to initialize the database:', error);
    }
  }
  public close(): void {
    if (this.serverInstance) {
      console.log('Shutting down server...');
      this.serverInstance.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    }
  }
  public getApp(): Application {
    return this.app;
  }
}

const server = new Server();

if (require.main === module) {
  server.start();
}

process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());

export default server;
