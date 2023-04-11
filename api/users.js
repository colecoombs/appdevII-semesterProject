/*  File: users.js
    Author: C. Coombs    
    Date: 02/28/2023

     Api route for users

     Modification Log: 
        03/20/2023: Added route to create user
		04/10/2023: Updated auth route to update last login in the database
*/

const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const router = require("express").Router();
const conn = require("../db");
const config = require("../configuration/config.json");
const dayjs = require('dayjs');
const { reject } = require("bcrypt/promises");

router.post("/auth", (req, res) => {
	let qry = "select email, password from users where email=?";
	console.log(`User: ${req.body.email} password: ${req.body.password}`);
	conn.query(qry, [req.body.email], (err, rows) => {
		// Server error
		if (err) {
			res.status(500).json({ err: "Server error" });
		}

		// User found
		else if (rows.length !== 0) {
			let user = rows[0];
			let password = user.password;

			// Encypt password
			if (bcrypt.compareSync(req.body.password, password)) {
				const payload = {user: user.email};
				const token = jwt.encode(payload , config.secret);
				const lastLogin = new Date();
				saveLastLogin(req.body.email, lastLogin)
					.then(() => res.status(200).json({"token" : token}))
					.catch(() => res.status(500).json({err : "Server error"}))
			}

			// Invalid login
			else {
				res.status(401).json({ err: "Invalid login" });
			}
		}

		// User not found
		else {
			console.log("User not found");
			res.status(401).json({ err: "Invalid login" });
		}
	});
});

// Route to create user
router.post("/create", (req, res) => {
	let dateCreated = new Date();
	let qry = "insert into users (email, password, lname, fname, dateCreated)";
	qry += "values(?, ?, ?, ?, ?)";

	// Password encryption
	hashPassword = bcrypt.hashSync(req.body.password, 10);

	// Define user data
	let userData = [
		req.body.email,
		hashPassword,
		req.body.lname,
		req.body.fname,
		dateCreated,
	];

	conn.query(qry, userData, (err, result) => {
		if (err) {
			// Duplicate user
			if (err.errno == 1062) {
				res.status(409).json({ err: "Duplicate error" });
			}
			// Server error
			else {
				res.status(500).json({ error: "Server error" });
			}
		}
		// Account created successfully
		else {
			res.status(201).json({ msg: "Account created" });
		}
	});
});

const saveLastLogin = (email, lastLogin) => {
	return new Promise((resolve, reject) => {
		let qry = "update users set lastlogin=? where email=?";
		conn.query(qry, [lastLogin, email], (error, result) => {
			if (!error) {
				resolve();
			}
			else {
				reject('Update failed');
			}
		})
	})
}

module.exports = router;
