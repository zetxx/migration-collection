const sql = require('postgres');

const m = require('../index');
const feeder = require('../fs/feeder');
const sorter = require('../sorter');
const importer = require('../fs/importer');
const ledger = require('../postgres/ledger');

const conn = (() => {
    let connection = null;
    return async(config) => {
        if (connection === null) {
            connection = await sql(config);
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
    const query = await conn({
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