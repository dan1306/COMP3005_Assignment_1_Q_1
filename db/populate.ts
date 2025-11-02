require('dotenv').config();

const { Client } = require("pg");
const database_name = "assignment_3_part_one"
const readline = require("readline-sync");
// connecting to the default database that comes with pgsql being 'postgres'
const client = new Client({
  user: "postgres",        // your postgres username
  host: "localhost",
  database: "postgres",      // default database that comes with pgsql
  password: process.env.database_password,  // for security reasons password of database should be kept in the env
  port: 5432,
});

async function check_create_and_populate_database() {
    await client.connect();

    // we should not use the default database, so we are going to check if the database
    // we would want to keep our data in exist
    try {
        const check_if_database_exist = await client.query(`SELECT datname FROM 
            pg_catalog.pg_database WHERE datname = '${database_name}'`)
        // console.log(check_if_database_exist);

        if(check_if_database_exist.rowCount == 0){
            let user_decision: string = "";
            while(user_decision !== "yes" && user_decision !== "no"){
                let input = readline.question("Do you give permission to create database(yes/no): ");
                user_decision = input.toLowerCase();
            }
            if(user_decision === "yes"){

            } else {
                console.log("Program will now terminate without creating database.");
                process.exit(0);
            }
        } else {
            console.log(`Desired database exist you can 
                continue to run the command 'npm run start' in your terminal.`)
        }

    }catch(e){
        console.log(e);
    }

    
};
async function create_and_populate_database() {


    
}

check_create_and_populate_database();

export { };

