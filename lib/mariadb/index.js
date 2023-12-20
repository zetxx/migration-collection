const sql = require('mariadb');

const m = require('../index');
const feeder = require('../fs/feeder');
const importer = require('../fs/importer');
const ledger = require('../mariadb/ledger');

const conn = (() => {
    let connection = null;
    return async(config) => {
        if (connection === null) {
            connection = await sql.createPool(config);
            return connection;
        }
        return connection;
    };
})();

const query = async(database) => {
    const {
        host,
        user,
        password
    } = database;
    const cPool = await conn({
        host,
        user,
        password,
        multipleStatements: true
    });
    return async(q) => {
        try {
            const p = await cPool.getConnection();
            const r = await p.query(q);
            await p.release();
            return r;
        } catch (e) {
            console.warn(q);
            console.error(e);
            throw e;
        }
    };
};

module.exports = async({
    connection,
    cwd
}) => {
    try {
        // using default sorter
        const coll = await m({
            feeder: feeder({cwd}),
            importer: importer(),
            ledger: ledger({
                query: await query(connection),
                database: connection.database
            }),
            end: async() => {
                (await conn()).end();
            }
        });
        return coll;
    } catch (e) {
        console.error(e);
    }
};