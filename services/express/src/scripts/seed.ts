import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017';
const dbName = process.env.DATABASE_NAME || 'honey-do';

const todos = [
  { name: 'Buy groceries', completed: false, tags: ['personal'], priority: 'medium', createdOn: new Date() },
  { name: 'Walk the dog', completed: true, tags: ['personal'], priority: 'low', createdOn: new Date() },
  { name: 'Do laundry', completed: false, tags: ['chore'], priority: 'low', createdOn: new Date() },
  { name: 'Write code', completed: false, tags: ['work'], priority: 'high', createdOn: new Date() },
  { name: 'Fix bugs', completed: true, tags: ['work'], priority: 'urgent', createdOn: new Date() },
];

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName);
    const collection = db.collection('todos');
    const counters = db.collection('counters');

    await collection.deleteMany({});
    await counters.deleteMany({});
    console.log('Cleared existing todos and counters');

    const todosWithSeq = todos.map((todo, index) => ({ ...todo, seq: index + 1 }));
    const result = await collection.insertMany(todosWithSeq);
    console.log(`Inserted ${result.insertedCount} todos`);

    await counters.insertOne({ _id: 'todos', seq: todos.length } as any);
    console.log('Initialized counters');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

seed();
