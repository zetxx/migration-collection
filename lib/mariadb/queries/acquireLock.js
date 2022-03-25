module.exports = ({database}) => `SET @lock = (SELECT COUNT(\`index\`) FROM \`${database}\`.\`migration.locks\` WHERE isLocked = 1);
SET @notLock = (SELECT COUNT(\`index\`) FROM \`${database}\`.\`migration.locks\` WHERE isLocked = 0);

SET @locked = (SELECT
    CASE
        WHEN (@lock - @notLock) = 1 THEN 1
        WHEN (@lock - @notLock) > 1 THEN @lock
        WHEN (@lock - @notLock) < 0 THEN @lock
        ELSE 0
    END);

SET @unlocked = (SELECT
    CASE
        WHEN (@lock - @notLock) = 1 THEN 0
        WHEN (@lock - @notLock) > 1 THEN @notLock
        WHEN (@lock - @notLock) < 0 THEN @notLock
        ELSE 1
    END);
SET @incorrectState = (SELECT
    CASE
        WHEN (@lock - @notLock) = 1 THEN 0
        WHEN (@lock - @notLock) > 1 THEN 1
        WHEN (@lock - @notLock) < 0 THEN 1
        ELSE 0
    END);

INSERT INTO \`${database}\`.\`migration.locks\` (isLocked)
    SELECT isLocked FROM (SELECT 1 as isLocked) as t1
    WHERE
        @locked = 0
        AND @unlocked = 1
        AND @incorrectState = 0;

SELECT @locked locked, @unlocked unlocked, @incorrectState incorrectState;`;