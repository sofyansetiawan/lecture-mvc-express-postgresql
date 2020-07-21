const pool = require("./config/connection");
const fs = require("fs");

fs.readFile("./people.json", "utf-8", (err, data) => {
    if(err){
        console.log(err);
    }
    else{
        data = JSON.parse(data);

        for(let i = 0; i < data.length; i++){
            let query = `
                INSERT INTO "peoples" ("firstname", "lastname", "age", "address", "isMale") VALUES ($1, $2, $3, $4, $5);
            `;

            let arrData = [data[i].firstname, data[i].lastname, data[i].age, data[i].address, data[i].isMale];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    throw err;
                }
                else{
                    console.log(`${data[i].firstname} sudah masuk datanya..`);
                    
                }
            });
        }

        pool.end();
    }
})