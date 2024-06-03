const { Pool } = require("pg");
require("dotenv").config({ path: "./server.env" });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  allowExitOnIdle: true,
});
pool.on("error", (err) => {
  console.error("ERROR AL CONECTARSE CON LA BASE DE DATOS", err);
  process.exit(-1);
});
module.exports = { pool };
