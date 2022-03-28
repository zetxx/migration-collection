--------------UP
CREATE TABLE [testMigration1].[batch] (
    [id] int IDENTITY(1, 1) NOT NULL,
    [someNull] int NULL
    CONSTRAINT [PK__batch__32F782A7135] PRIMARY KEY ([id])
);
--------------DOWN
DROP TABLE [testMigration1].[batch]