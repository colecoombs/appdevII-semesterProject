// Author: C. Coombs  Date: 02/23/2023
//
// Database connection used for the semester project
//
//Modification Log

const mysql = require("mysql");
const config = require("./configuration/config.json");

const conn = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = conn;