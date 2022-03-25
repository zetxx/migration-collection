module.exports = ({
    database,
    schema,
    migration
}) => `SELECT 1 as exists FROM "${database}"."${schema}"."migration.list" WHERE name = '${migration}'`;