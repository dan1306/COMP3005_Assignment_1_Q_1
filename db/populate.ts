// load env variables from the .env file
require('dotenv').config();

const { Client } = require("pg");

// name of database we want for the assignment
const database_name = process.env.database_name; 

const readline = require("readline-sync");

// we are first going to connect to the default postgres database to see 
// if our desired database for the assignment is in there, and if not create it
let client = new Client({
  user: "postgres",        
  host: "localhost",
  database: "postgres",      // default database that comes with pgsql
  password: process.env.database_password,  // for security reasons password of database should be kept in the env
  port: 5432,
});

/*
This function connects to postgres and checks if our assignment DB exists.
If not, we ask the user if we can create it. If yes, we create and populate it.
*/
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
                create_and_populate_database();
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

/*
This function creates the database, reconnects into it,
creates the students table, and inserts the initial data.
*/
async function create_and_populate_database() {
    await client.query(`CREATE DATABASE ${database_name}`);
     await client.end();
client = new Client({
  user: "postgres",        // your postgres username
  host: "localhost",
  database: database_name,     
  password: process.env.database_password,  // for security reasons password of database should be kept in the env
  port: 5432,
});

  await client.connect();

      await client.query(`
    CREATE TABLE students (
      student_id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      enrollment_date DATE
    );
  `);

    await client.query(`
INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');
  `);

    console.log("Database has been created and populated with initial data");
    await client.end();
    process.exit(0);
}

check_create_and_populate_database();

export { };

