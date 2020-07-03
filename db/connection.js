const util = require("util");
const mysql = require("mysql");

// Creating connection to MySQL employee db
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_systemDB"
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;