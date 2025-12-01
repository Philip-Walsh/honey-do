"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateIndexes = makeCreateIndexes;
const __1 = require("..");
function makeCreateIndexes(makeDb, uri, dbName) {
    return async function createIndexes(collection, schema = { name: 1 }, // Fix: Only define fields here
    options = { unique: true } // Fix: Pass options separately
    ) {
        await __1.todosDb.createIndex(collection, schema, options);
        console.log('✅ Indexes created successfully!');
    };
}
//# sourceMappingURL=makeCreateIndexes.js.map