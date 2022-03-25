module.exports = ({
    database,
    schema,
    batch,
    migration
}) => `INSERT INTO
    [${database}].[${schema}].[migration.list]
    ([name], [batch], [time]) VALUES (
        '${migration}',
        ${batch},
        GETDATE()
    )`;