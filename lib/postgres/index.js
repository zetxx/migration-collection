const {Pool} = require('pg');

const m = require('../index');
const feeder = require('../fs/feeder');
const sorter = require('../sorter');
const importer = require('../fs/importer');
const ledger = require('../postgres/ledger');

const conn = (() => {
    let connection = null;
    return async(config) => {
        if (connection === null) {
            connection = new Pool(config);
            return connection;
        }
        return connection;
    };
})();

const query = async(config) => {
    const {
        host,
        username,
        password,
        database
    } = config;
    const connection = await conn(config);
    return async(q) => {
        try {
            const res = (await connection.query(q));
            return res.rows || res;
        } catch (e) {
            console.warn(q);
            console.error(e);
            throw e;
        }
    };
};

module.exports = async({
    database,
    schema, // migration schema, to where to go all migration tables
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
                (await conn()).end();
            }
        });
        console.log(JSON.stringify(coll, null, 4));
    } catch (e) {
        console.error(e);
    }
};