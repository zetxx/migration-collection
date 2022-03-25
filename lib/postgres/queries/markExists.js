module.exports = ({
    database,
    schema,
    batch,
    migration
}) => `INSERT INTO
    "${database}"."${schema}"."migration.list"
    (name, batch) VALUES (
        '${migration}',
        ${batch}
    )`;