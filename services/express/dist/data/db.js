"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDb = makeDb;
const mongodb_1 = require("mongodb");
const utils_1 = require("../utils");
function makeDb(uri, dbName) {
    const client = new mongodb_1.MongoClient(uri);
    let dbInstance;
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
        async function _runQuery(collectionName, fn) {
            try {
                const db = await _connect();
                const collection = db.collection(collectionName);
                return await fn(collection);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        }
        async function findAll(collectionName, query = {}) {
            // TODO: obj with _id
            const results = await _runQuery(collectionName, (collection) => collection.find(query).toArray());
            return results.map((item) => {
                const { _id, ...rest } = item;
                return { id: _id.toString(), ...rest };
            });
        }
        async function findOne(collectionName, query = {}) {
            const result = await _runQuery(collectionName, (collection) => collection.findOne(query));
            if (result) {
                // TODO: reuse above
                const { _id, ...rest } = result;
                return { id: _id.toString(), ...rest };
            }
            return null;
        }
        async function insertOne(collectionName, query = {}) {
            return await _runQuery(collectionName, (collection) => collection.insertOne(query));
        }
        async function deleteOne(collectionName, query = {}) {
            return await _runQuery(collectionName, (collection) => collection.deleteOne(query));
        }
        async function updateOne(collectionName, query = {}, update) {
            // TODO: check upsert
            return await _runQuery(collectionName, (collection) => collection.updateOne(query, update, { upsert: true }));
        }
        async function updateMany(collectionName, query = {}, update) {
            return await _runQuery(collectionName, (collection) => collection.updateMany(query, update));
        }
        async function insertMany(collectionName, query = {}) {
            return await _runQuery(collectionName, (collection) => collection.insertMany(query));
        }
        async function deleteMany(collectionName, query = {}) {
            return await _runQuery(collectionName, (collection) => collection.deleteMany(query));
        }
        async function aggregate(collectionName, query = {}) {
            return await _runQuery(collectionName, (collection) => collection.aggregate(query).toArray());
        }
        async function count(collectionName, query = {}) {
            return await _runQuery(collectionName, (collection) => collection.countDocuments(query));
        }
        async function createIndex(collectionName, schema, options = {}) {
            return await _runQuery(collectionName, (collection) => collection.createIndex(schema, options));
        }
        async function dropCollection(collectionName) {
            const db = await _connect();
            try {
                await db.dropCollection(collectionName);
            }
            catch (err) {
                const error = (0, utils_1.ensureError)(err);
                console.log(error.message);
                if (error.message !== 'ns not found') {
                    throw error;
                }
            }
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
            close: _disconnect,
        };
    };
}
//# sourceMappingURL=db.js.map