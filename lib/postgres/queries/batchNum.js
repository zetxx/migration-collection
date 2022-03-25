module.exports = ({
    database,
    schema
}) => `SELECT
    CASE WHEN MAX(batch) IS NULL THEN 0 ELSE MAX(batch) END as batch
FROM "${database}"."${schema}"."migration.list";`