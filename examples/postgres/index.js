const m = require('../../lib/index');
const feeder = require('../../lib/fs/feeder');
const sorter = require('../../lib/sorter');
const importer = require('../../lib/fs/importer');
const ledger = require('../../lib/postgres/ledger');

const sql = require('postgres');

const query = (async() => {
    const {
        host,
        username,
        password,
        database
    } = require('./connection.config');
    const query = await sql({
        host,
        max: 1,
        username,
        password,
        database
    });
    return async(q) => {
        try {
            return await query.unsafe(q);
        } catch (e) {
            console.warn(q);
            console.error(e);
            throw e;
        }
    };
});

(async() => {
    try {
        const coll = await m({
            feeder: feeder({
                cwd: 'examples/postgres/migrations'
            }),
            sorter: sorter({sortBy: 'baseName'}),
            importer: importer(),
            ledger: ledger({
                query: await query(),
                database: require('./connection.config').database,
                schema: 'dbo'
            })
        });
        console.log(JSON.stringify(coll, null, 4));
    } catch (e) {
        console.error(e);
    }
})();