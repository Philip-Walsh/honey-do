"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017';
const dbName = process.env.DATABASE_NAME || 'honey-do';
const todos = [
    { title: 'Buy groceries', completed: false },
    { title: 'Walk the dog', completed: true },
    { title: 'Do laundry', completed: false },
    { title: 'Write code', completed: false },
    { title: 'Fix bugs', completed: true },
];
async function seed() {
    const client = new mongodb_1.MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to database');
        const db = client.db(dbName);
        const collection = db.collection('todos');
        await collection.deleteMany({});
        console.log('Cleared existing todos');
        const result = await collection.insertMany(todos);
        console.log(`Inserted ${result.insertedCount} todos`);
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        await client.close();
        console.log('Connection closed');
    }
}
seed();
//# sourceMappingURL=seed.js.map