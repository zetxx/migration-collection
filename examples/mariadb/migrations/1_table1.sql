--------------UP
CREATE TABLE `migration-test`.`NewTable` (
    a varchar(100) NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
--------------DOWN
DROP TABLE `migration-test`.`NewTable`;