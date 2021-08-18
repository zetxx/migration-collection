module.exports = ({
    database,
    schema,
    migration
}) => `IF EXISTS(SELECT 1 FROM [${database}].[${schema}].[migration.list] WHERE [name] = '${migration}')
SELECT 1 [exists]
ELSE
SELECT 0 [exists]`;