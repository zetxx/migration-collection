const m = require('../../lib/index');
const feeder = require('../../lib/fs/feeder');
const sorter = require('../../lib/sorter');
const importer = require('../../lib/fs/importer');
const ledger = require('../../lib/mssql/ledger');

const sql = require('mssql');

const query = (async() => {
    const {
        server,
        user,
        password,
        pool,
        database,
        options
    } = require('../mssql.config.js');
    const cPool = await sql.connect({
        server,
        user,
        password,
        pool,
        database,
        options
    });
    return async(q) => {
        try {
            return await cPool.request().query(q);
        } catch (e) {
            console.error(e);
            throw e;
        }
    };
});

(async() => {
    try {
        const coll = await m({
            feeder: feeder({
                cwd: 'tests/unit/runtime/migration'
            }),
            sorter: sorter({sortBy: 'baseName'}),
            importer: importer(),
            ledger: ledger({
                query: await query(),
                database: require('../mssql.config.js').database,
                schema: 'dbo'
            })
        });
        console.log(JSON.stringify(coll, null, 4));
    } catch (e) {
        console.error(e);
    }
})();