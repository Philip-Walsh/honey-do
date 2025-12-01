import { todosDb } from '..';

export function makeCreateIndexes(makeDb: Function, uri: string, dbName: string) {
  return async function createIndexes(
    collection: string,
    schema: object = { name: 1 }, // Fix: Only define fields here
    options: object = { unique: true } // Fix: Pass options separately
  ) {
    await todosDb.createIndex(collection, schema, options);
    console.log('✅ Indexes created successfully!');
  };
}
