const {join} = require('path');
const tables = require('./queries/tables.js');
const createTables = require('./queries/createTables');
const acquireLock = require('./queries/acquireLock');
const releaseLock = require('./queries/releaseLock');
const exists = require('./queries/exists');
const batchNum = require('./queries/batchNum');
const markExists = require('./queries/markExists.js');

const requiredTables = ['migration.list', 'migration.locks'];

const findTables = (needles, haystack, found = []) => {
    const needle = needles.pop();
    if (!needle) {
        return found.filter(Boolean);
    }
    haystack.find(({name}) => name === needle);
    return findTables(
        needles,
        haystack,
        found
            .concat([haystack.find(({name}) => name === needle)])
    );
};

module.exports = ({
    database,
    schema,
    query
}) => {
    let currentBatch = 0;
    return {
        check: async() => {
            const result = await query(tables({database, schema}));
            const tbls = findTables(
                [].concat(requiredTables),
                result
            );
            if (requiredTables.length !== tbls.length) {
                throw new Error('Needed tables are not consistent');
            }
        },
        init: async() => {
            await Promise.all(createTables({database, schema}).map(
                (q) => query(q)
            ));
        },
        lock: async() => {
            const r1 = (await query(
                acquireLock({database, schema})
            ));
            const [{
                incorrectstate: incorrectState,
                locked,
                unlocked
            }] = r1
                .find(({command}) => command === 'SELECT')
                .rows;
            if (incorrectState) {
                throw new Error('Incorrect lock state');
            } else if (locked) {
                throw new Error('Already locked');
            }
            const r2 = (await query(batchNum({
                database,
                schema
            })));
            const {batch} = r2.pop();
            currentBatch = batch + 1;
        },
        unlock: async() => {
            await query(releaseLock({database, schema}));
        },
        exists: async({baseName, path}) => {
            const result = ((await query(exists({
                database,
                schema,
                migration: join(path, baseName)
            }))) || []).pop();
            return result?.exists;
        },
        markExists: async({baseName, path}) => {
            await query(markExists({
                database,
                schema,
                migration: join(path, baseName),
                batch: currentBatch
            }));
        },
        exec: async(item) => {
            await query(item.parsed.up);
        }
    }
};