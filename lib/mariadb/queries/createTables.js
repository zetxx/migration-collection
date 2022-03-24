module.exports = ({database}) => [
`CREATE TABLE \`${database}\`.\`migration.list\` (
	id INT auto_increment NOT NULL,
	name varchar(500) NOT NULL,
	batch INT NOT NULL,
	\`time\` DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,
`CREATE TABLE \`${database}\`.\`migration.locks\` (
	\`index\` INT auto_increment NOT NULL,
	isLocked INT NOT NULL,
	\`time\` DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	primary key (\`index\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`
];

