require('dotenv').config();

const readline = require("readline-sync");

// while (true) {
//   const input = readline.question("Enter something (or type exit): ");

//   if (input === "exit") {
//     console.log("Goodbye!");
//     process.exit(0);
//   }

//   console.log("You typed:", input);
// }

const { pool } = require("./db/index");

async function testDB() {
  const result = await pool.query("SELECT * FROM authors;");
  console.log(result.rows);
}

testDB();

