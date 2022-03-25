module.exports = ({database, schema}) => [
`CREATE TABLE "${database}"."${schema}"."migration.list" (
	id serial PRIMARY KEY,
	"name" varchar NULL,
	batch int NULL,
	"time" timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`,
`CREATE TABLE "${database}"."${schema}"."migration.locks" (
	index serial PRIMARY KEY,
	isLocked int NULL,
	"time" timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`
];
