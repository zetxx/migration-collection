module.exports = ({database, schema}) => `SELECT
[table_name] as [name]
FROM
[information_schema].[tables] 
WHERE
[table_type] = 'BASE TABLE' 
AND
[table_catalog] = '${database}'
AND
[table_schema] = '${schema}'`;