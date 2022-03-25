--------------UP
CREATE TABLE "migration-test"."dbo"."newtable" (
    column1 varchar NULL
);
--------------DOWN
DROP TABLE "migration-test"."dbo"."newtable";
