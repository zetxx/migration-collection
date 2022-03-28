const m = require('../index');
const feeder = require('../fs/feeder');
const importer = require('../fs/importer');
const ledger = require('../mariadb/ledger');

const sql = require('mariadb');

const query = async(database) => {
    const {
        host,
        user,
        password
    } = database;
    const cPool = await sql.createPool({
        host,
        user,
        password,
        multipleStatements: true
    });
    return async(q) => {
        try {
            return await (await cPool.getConnection()).query(q);
        } catch (e) {
            console.warn(q);
            console.error(e);
            throw e;
        }
    };
};

module.exports = async({
    database,
    cwd
}) => {
    try {
        // using default sorter
        const coll = await m({
            feeder: feeder({cwd}),
            importer: importer(),
            ledger: ledger({
                query: await query(database),
                database: database.database
            })
        });
        console.log(JSON.stringify(coll, null, 4));
    } catch (e) {
        console.error(e);
    }
};