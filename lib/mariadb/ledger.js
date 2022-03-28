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
    query,
    end
}) => {
    let currentBatch = 0;
    return {
        check: async() => {
            const result = await query(tables({database, schema}));
            const tbls = findTables(
                [].concat(requiredTables),
                Array.from(result)
            );
            if (requiredTables.length !== tbls.length) {
                throw new Error('Needed tables are not consistent');
            }
        },
        init: async() => {
            await Promise.all(createTables({database}).map(
                (q) => query(q)
            ));
        },
        lock: async() => {
            const [{
                incorrectState,
                locked,
                unlocked
            }] = (await query(
                acquireLock({database})
            ))
                .pop();
            if (incorrectState) {
                throw new Error('Incorrect lock state');
            } else if (locked) {
                throw new Error('Already locked');
            }
            const {batch} = (await query(batchNum({
                database
            }))).pop();
            currentBatch = batch + 1;
        },
        unlock: async() => {
            await query(releaseLock({database}));
        },
        exists: async({baseName, path}) => {
            const result = (await query(exists({
                database,
                migration: join(path, baseName)
            }))).pop();
            return result?.exists;
        },
        markExists: async({baseName, path}) => {
            await query(markExists({
                database,
                migration: join(path, baseName),
                batch: currentBatch
            }));
        },
        exec: async(item) => {
            await query(item.parsed.up);
        }
    }
};