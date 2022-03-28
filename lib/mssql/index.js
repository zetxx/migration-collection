const sql = require('mssql');

const m = require('../index');
const feeder = require('../fs/feeder');
const importer = require('../fs/importer');
const ledger = require('../mssql/ledger');

const query = async(config) => {
    const {
        server,
        user,
        password,
        database,
        pool,
        options
    } = config;
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
            console.warn(q);
            console.error(e);
            throw e;
        }
    };
};

module.exports = async({
    database,
    schema,
    cwd
}) => {
    try {
        // using default sorter
        const coll = await m({
            feeder: feeder({cwd}),
            importer: importer(),
            ledger: ledger({
                query: await query(database),
                database: database.database,
                schema
            })
        });
        console.log(JSON.stringify(coll, null, 4));
    } catch (e) {
        console.error(e);
    }
};