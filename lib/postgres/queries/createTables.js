module.exports = ({database, schema}) => [
`CREATE TABLE [${database}].[${schema}].[migration.list] (
    [id] INT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(500) NOT NULL,
    [batch] INT NOT NULL,
    [time] DATETIME2 NULL,
    CONSTRAINT [PK__migrations__tool] PRIMARY KEY ([id])
);`,
`CREATE TABLE [${database}].[${schema}].[migration.locks] (
    [index] INT IDENTITY(1,1) NOT NULL,
    [isLocked] TINYINT NOT NULL,
    [time] DATETIME2 NULL,
    CONSTRAINT [PK__migration_locks__tool] PRIMARY KEY ([index])
);`
];