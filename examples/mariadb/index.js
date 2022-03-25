const m = require('../../lib/index');
const feeder = require('../../lib/fs/feeder');
const importer = require('../../lib/fs/importer');
const ledger = require('../../lib/mariadb/ledger');

const sql = require('mariadb');

const query = (async() => {
    const {
        host,
        user,
        password
    } = require('./connection.config');
    const cPool = await sql.createPool({
        host,
        user,
        password,
        multipleStatements: true
    });
    return async(q) => {
        try {
            return (await cPool.getConnection()).query(q);
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
                cwd: 'examples/mariadb/migrations'
            }),
            importer: importer(),
            ledger: ledger({
                query: await query(),
                database: require('./connection.config').database
            })
        });
        console.log(JSON.stringify(coll, null, 4));
    } catch (e) {
        console.error(e);
    }
})();