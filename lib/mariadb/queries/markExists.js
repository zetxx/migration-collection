module.exports = ({
    database,
    batch,
    migration
}) => `INSERT INTO
    \`${database}\`.\`migration.list\`
    (name, batch) VALUES (
        '${migration}',
        ${batch}
    )`;