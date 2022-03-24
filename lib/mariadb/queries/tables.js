module.exports = ({database}) => `SELECT
    TABLE_NAME  as name
FROM
    INFORMATION_SCHEMA.TABLES
WHERE
TABLE_SCHEMA = '${database}'
AND TABLE_TYPE = 'BASE TABLE'`;

