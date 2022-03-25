module.exports = ({database, schema}) => `DECLARE @lock AS INT, @notLock AS INT

SELECT @lock = COUNT([index]) FROM [${database}].[${schema}].[migration.locks] WHERE isLocked = 1
SELECT @notLock = COUNT([index]) FROM [${database}].[${schema}].[migration.locks] WHERE isLocked = 0

IF ((@lock - @notLock) = 1)
    SELECT 1 locked, 0 unlocked, 0 incorrectState
ELSE IF ((@lock - @notLock) > 1)
    SELECT @lock locked, @notLock unlocked, 1 incorrectState
ELSE IF ((@lock - @notLock) < 0)
    SELECT @lock locked, @notLock unlocked, 1 incorrectState
ELSE
    INSERT INTO [${database}].[${schema}].[migration.locks] ([isLocked], [time])
        OUTPUT 0 locked, 1 unlocked, 0 incorrectState
        VALUES (1, GETDATE())`;