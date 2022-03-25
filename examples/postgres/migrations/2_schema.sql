--------------UP
CREATE TABLE "migration-test"."dbo"."newtable2" (
    column1 varchar NULL
);
--------------DOWN
DROP TABLE "migration-test"."dbo"."newtable2";
