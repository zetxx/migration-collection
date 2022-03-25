module.exports = ({database, schema, query}) => `SELECT
    table_name as name
FROM
    information_schema.tables
WHERE
    table_catalog='${database}'
    AND table_schema='${schema}'
    AND table_type='BASE TABLE'`;