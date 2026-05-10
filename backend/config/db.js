const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3307
});

connection.connect((error) => {
  if (error) {
    console.log("Error de conexión:", error);
  } else {
    console.log("MySQL conectado");
  }
});

module.exports = connection;