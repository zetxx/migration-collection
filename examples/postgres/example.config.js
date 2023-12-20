module.exports = {
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'mysecretpassword',
        database: 'migration-test'
    },
    schema: 'dbo',
    cwd: 'examples/postgres/migrations'
};