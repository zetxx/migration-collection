const sql = require('mssql');

const m = require('../index');
const feeder = require('../fs/feeder');
const importer = require('../fs/importer');
const ledger = require('../mssql/ledger');

const conn = (() => {
    let connection = null;
    return async(config) => {
        if (connection === null) {
            connection = await sql.connect(config);
            return connection;
        }
        return connection;
    };
})();


const query = async(config) => {
    const {
        server,
        user,
        password,
        database,
        pool,
        options
    } = config;
    const cPool = await conn({
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
    migration: {schema},
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
            }),
            end: async() => {
                (await conn()).close();
            }
        });
        console.log(JSON.stringify(coll, null, 4));
    } catch (e) {
        console.error(e);
    }
};