module.exports = ({database, schema}) => `INSERT INTO "${database}"."${schema}"."migration.locks" (isLocked)
VALUES (0)`;