require('dotenv').config("../.env");

const mysql = require('mysql2/promise');
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.query('SELECT 1')
  .then(() => {
    console.log("Connected to MySQL");
  })
  .catch(err => {
    console.error("Error connecting to MySQL", err);
  });

module.exports = connection;