/*  File: load_journal.js
    Author: C. Coombs    
    Date: 03/28/2023

     Api route for journal data

     Modification Log:
	 	05/01/2023 - Added a query to the database to return the 10 most recent journal entries 
        
*/

const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const router = require("express").Router();
const conn = require("../db");
const config = require("../configuration/config.json");
const dayjs = require('dayjs');


router.get("/load_data", (req, res) => {
	console.log("route called");
	if (!req.headers["x-auth"]) {
		res.status(403).json({ err: "Missing X-Auth header" });
		console.log("1");
	}
	const token = req.headers["x-auth"];

	const decoded = jwt.decode(token, config.secret);
	let qry = "select * from users where email=?";
	conn.query(qry, decoded.user, (err, rows) => {
		if (err) return res.status(500).json({error: err});
		const lastLogin = new Date(rows[0].lastLogin);
		const curDate = new Date();
		let timeDiff = curDate.getTime() - lastLogin.getTime();
		if (timeDiff > config.expTime) {
			res.status(403).json({err: "Timed out"});
			console.log("2");
		}
		else {
			console.log("3");
			let qry = "SELECT * FROM weather.journal_entry WHERE users_email=? ORDER BY date_of_entry LIMIT ?;";
			conn.query(qry, [decoded.user, config.journal_limit], (err, result) => {
				if (err) {
					console.log("4");
					return res.status(500).json({error: err});
				}
				else {
					console.log("5");
					return res.status(200).json({result});
				}
			})
		}
	});
});

module.exports = router;

