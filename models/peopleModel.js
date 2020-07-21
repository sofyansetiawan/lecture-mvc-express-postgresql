const pool = require("../config/connection");

class People {
    constructor(id, firstname, lastname, age, address, isMale){
        this.id = +id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.address = address;
        this.isMale = isMale;
    }

    static showAll(callback){
        let query = `SELECT * FROM "peoples";`;

        pool.query(query, (err, peoples) => {
            if(err){
                callback(err, null);
            }
            else{

                peoples = peoples.rows.map(people => new People(people.id, people.firstname, people.lastname, people.age, people.address, people.isMale));

                console.log(peoples);

                console.log("SHOW DATA");
                callback(null, peoples)
            }
        });
        
    }

    static addPost(objPerson, callback){
        let query = `
                INSERT INTO "peoples" ("firstname", "lastname", "age", "address", "isMale") VALUES ($1, $2, $3, $4, $5);
            `;

            let arrData = [objPerson.firstname, objPerson.lastname, objPerson.age, objPerson.address, objPerson.isMale];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    callback(err, null);
                }
                else{
                    console.log(`${objPerson.firstname} sudah masuk datanya..`);
                    callback(null, null);
                }
            });
    }

    static editForm(id, callback){
        let query = `SELECT * FROM "peoples" WHERE id = ${+id};`;

        pool.query(query, (err, peoples) => {
            if(err){
                callback(err, null);
            }
            else{
                // * instantiate
                console.log(peoples.rows[0]);
                console.log("SHOW DATA");
                callback(null, peoples.rows[0]);
            }
        });

    }

    static editPost(id, objPerson, callback){
        let query = `
            UPDATE "peoples" SET "firstname" = $1, "lastname" = $2, "age" = $3, "address" = $4, "isMale" = $5 WHERE "id" = ${+id};
            `;

            let arrData = [objPerson.firstname, objPerson.lastname, objPerson.age, objPerson.address, objPerson.isMale];

            pool.query(query, arrData, (err, result) => {
                if(err){
                    callback(err, null);
                }
                else{
                    console.log(`${objPerson.firstname} sudah di update datanya..`);
                    callback(null, null);
                }
            });
    }

    static delete(){
        let query = `
                DELETE FROM "peoples" WHERE "id" = 1;
            `;
    }
}

module.exports = People;