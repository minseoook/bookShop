const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3307,
  database: "bookshop",
  dateStrings: true,
});

module.exports = conn;
