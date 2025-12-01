import { todosDb } from 'src/data';
import crypto from 'crypto';

Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length)
  }
});

async function setupFilesAfterEnv() {
  let db = todosDb;
  let collectionName = 'todos';
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    // Ignore error if collection doesn't exist
  }
  await db.close();

  console.log('Finished Tests 🏁');
}

setupFilesAfterEnv();
