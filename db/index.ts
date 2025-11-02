require('dotenv').config();
const { Pool } = require("pg");

export const pool = new Pool({
  user: "postgres",        // your postgres username
  host: "localhost",
  database: "secon_lib_system",      // your database name
  password: process.env.database_password,
  port: 5432,
});