module.exports = ({
    database,
    migration
}) => `SELECT 1 as \`exists\` FROM \`${database}\`.\`migration.list\` WHERE name = '${migration}'`;