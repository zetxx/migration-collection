module.exports = ({database, schema}) => `INSERT INTO [${database}].[${schema}].[migration.locks] ([isLocked], [time])
VALUES (0, GETDATE())`;