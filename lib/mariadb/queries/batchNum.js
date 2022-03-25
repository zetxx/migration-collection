module.exports = ({
    database
}) => `SELECT IFNULL(MAX(batch), 0) as batch FROM \`${database}\`.\`migration.list\``;