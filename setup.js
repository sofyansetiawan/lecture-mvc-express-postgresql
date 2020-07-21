const pool = require("./config/connection");

const dropTable = `
    DROP TABLE IF EXISTS "peoples";
`;

const queryTable = `
    CREATE TABLE "peoples" (
        "id" SERIAL PRIMARY KEY,
        "firstname" VARCHAR(50) NOT NULL,
        "lastname" VARCHAR(50) NOT NULL,
        "age" INTEGER NOT NULL,
        "address" TEXT NOT NULL,
        "isMale" BOOLEAN NOT NULL
    );
`;

pool.query(dropTable, (err, result) => {
    if(err){
        throw err;
    }
    else{
        console.log("DROP TABLE")
        pool.query(queryTable, (err, result) => {
            if(err){
                throw err;
            }
            else{
                console.log("CREATE TABLE");
                pool.end();
            }
        });
    }
});