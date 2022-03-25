module.exports = ({database, schema}) => 
`BEGIN TRANSACTION;

	CREATE TEMP TABLE mytemp(
		r INT,
		lock INT,
		notLock INT,
		locked INT,
		unlocked INT,
		incorrectState INT
	) ON COMMIT DROP;
	
	INSERT INTO mytemp(
		r,
		lock,
		notLock
	)
	VALUES (
		1,
		(SELECT COUNT(index) FROM "${database}"."${schema}"."migration.locks" WHERE isLocked = 1),
		(SELECT COUNT(index) FROM "${database}"."${schema}"."migration.locks" WHERE isLocked = 0)
	);
	UPDATE mytemp SET 
		locked = u.locked,
		unlocked = u.unlocked,
		incorrectState = u.incorrectState
	FROM (
		SELECT
			CASE
		        WHEN (lock - notLock) = 1 THEN 1
		        WHEN (lock - notLock) > 1 THEN lock
		        WHEN (lock - notLock) < 0 THEN lock
		        ELSE 0
		    END AS locked,
			CASE
		        WHEN (lock - notLock) = 1 THEN 0
		        WHEN (lock - notLock) > 1 THEN notLock
		        WHEN (lock - notLock) < 0 THEN notLock
		        ELSE 1
		    END AS unlocked,
		    CASE
		        WHEN (lock - notLock) = 1 THEN 0
		        WHEN (lock - notLock) > 1 THEN 1
		        WHEN (lock - notLock) < 0 THEN 1
		        ELSE 0
		    END AS incorrectState
		FROM
			mytemp
		WHERE r = 1
	) as u;

    INSERT INTO "${database}"."${schema}"."migration.locks" (isLocked)
	    SELECT 1 as isLocked FROM mytemp
	    WHERE
	    	r = 1
	        AND locked = 0
	        AND unlocked = 1
	        AND incorrectState = 0;

    SELECT * from mytemp;
COMMIT;`