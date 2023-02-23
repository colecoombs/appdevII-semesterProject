// Author: C. Coombs  Date: 02/23/2023
//
// Database connection used for the semester project
//
//Modification Log

const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: "weather-dev",
    password: "Letmein1!",
    database: "weather"
});

module.exports = conn;