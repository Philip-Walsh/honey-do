import { MongoClient } from 'mongodb';
import { ensureError } from '../utils';

export function makeDb(uri: string, dbName: string) {
  const client = new MongoClient(uri);
  let dbInstance: any;

  return function db() {
    async function _connect() {
      if (!dbInstance) {
        await client.connect();
        dbInstance = client.db(dbName);
      }
      return dbInstance;
    }

    async function _disconnect() {
      if (client) {
        await client.close();
        dbInstance = null;
      }
    }

    async function _runQuery(collectionName: string, fn: (collection: any) => Promise<unknown>) {
      try {
        const db = await _connect();
        const collection = db.collection(collectionName);
        return await fn(collection);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    async function findAll(collectionName: string, query: object = {}) {
      // TODO: obj with _id
      const results: any = await _runQuery(collectionName, (collection) =>
        collection.find(query).toArray()
      );
      return results.map((item: any) => {
        const { _id, ...rest } = item;
        return { id: _id.toString(), ...rest };
      });
    }

    async function findOne(collectionName: string, query: object = {}) {
      const result: any = await _runQuery(collectionName, (collection) =>
        collection.findOne(query)
      );
      if (result) {
        // TODO: reuse above
        const { _id, ...rest } = result;
        return { id: _id.toString(), ...rest };
      }
      return null;
    }
    async function insertOne(collectionName: string, query: object = {}) {
      return await _runQuery(collectionName, (collection) => collection.insertOne(query));
    }
    async function deleteOne(collectionName: string, query: object = {}) {
      return await _runQuery(collectionName, (collection) => collection.deleteOne(query));
    }
    async function updateOne(collectionName: string, query: object = {}, update: object) {
      // TODO: check upsert
      return await _runQuery(collectionName, (collection) =>
        collection.updateOne(query, update, { upsert: true })
      );
    }
    async function updateMany(collectionName: string, query: object = {}, update: object) {
      return await _runQuery(collectionName, (collection) => collection.updateMany(query, update));
    }
    async function insertMany(collectionName: string, query: object = {}) {
      return await _runQuery(collectionName, (collection) => collection.insertMany(query));
    }
    async function deleteMany(collectionName: string, query: object = {}) {
      return await _runQuery(collectionName, (collection) => collection.deleteMany(query));
    }
    async function aggregate(collectionName: string, query: object = {}) {
      return await _runQuery(collectionName, (collection) => collection.aggregate(query).toArray());
    }
    async function count(collectionName: string, query: object = {}) {
      return await _runQuery(collectionName, (collection) => collection.countDocuments(query));
    }
    async function createIndex(collectionName: string, schema: object, options: object = {}) {
      return await _runQuery(collectionName, (collection) =>
        collection.createIndex(schema, options)
      );
    }

    async function dropCollection(collectionName: string) {
      const db = await _connect();
      try {
        await db.dropCollection(collectionName);
      } catch (err: unknown) {
        const error = ensureError(err);
        console.log(error.message);
        if (error.message !== 'ns not found') {
          throw error;
        }
      }
    }

    async function findOneAndUpdate(collectionName: string, query: object, update: object, options: object = {}) {
      return await _runQuery(collectionName, (collection) =>
        collection.findOneAndUpdate(query, update, options)
      );
    }

    return {
      findAll,
      findOne,
      createIndex,
      insertOne,
      deleteOne,
      deleteMany,
      updateOne,
      updateMany,
      insertMany,
      count,
      aggregate,
      dropCollection,
      findOneAndUpdate,
      close: _disconnect,
    };
  };
}
