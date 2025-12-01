import dotenv from 'dotenv';
dotenv.config();

import { makeDb } from './db';
import { makeCreateIndexes } from './init';
const mongoUri = String(process.env.DATABASE_URL);
const defaultDbName = String(process.env.DATABASE_NAME);

const createDbInstance = (dbName?: string) => {
  return makeDb(mongoUri, dbName || defaultDbName)();
};

async function initDb() {
  console.log('Initializing DB');
  await makeCreateIndexes(makeDb, mongoUri, defaultDbName)('todos');
}
const todosDb = createDbInstance();

export { createDbInstance, initDb, todosDb };
