module.exports = ({
    database,
    schema
}) => `SELECT ISNULL(MAX([batch]), 0) [batch] FROM [${database}].[${schema}].[migration.list]`;