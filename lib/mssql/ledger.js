const tables = require('./queries/tables.js')

module.exports = ({
    database,
    schema,
    query
}) => {
    const file = () => join(cwd, cwf);

    return {
        check: async() => {
            const result = await query(tables({database, schema}));
            console.log(result);
        },
        init: async() => {
        },
        lock: async() => {
        },
        unlock: async() => {
        },
        exists: async({baseName, path}) => {
        },
        markExists: async({baseName, path}) => {
        },
        exec: async(item) => {
            return 'execute';
        }
    }
};