module.exports = ({database}) => `INSERT INTO \`${database}\`.\`migration.locks\` (isLocked)
VALUES (0)`;