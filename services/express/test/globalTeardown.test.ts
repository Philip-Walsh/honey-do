import { todosDb } from '../src/data';

export default async function globalTeardown() {
  const db = todosDb;
  const collectionName = 'todos';

  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    // Ignore error if collection doesn't exist
  }
  await db.close();

  //   console.log('Finished Tests 🏁');
}
