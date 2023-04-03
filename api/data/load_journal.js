/*  File: load_journal.js
    Author: C. Coombs    
    Date: 03/28/2023

     Api route for journal data

     Modification Log: 
        
*/

const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const router = require("express").Router();
const conn = require("../../db");
const config = require("../../configuration/config.json");

router.get("/load_journal", (req, res) => {
	if (!req.headers["x-auth"]) {
		res.status(403).json({ err: "Missing X-Auth header" });
	}
	const token = req.headers["x-auth"];
	try {
		let currentDate = new Date();
		let lastLogin = req.lastLogin;
		if ((currentDate - lastLogin) > config.tokenExpiration) {
			res.status(403).json({err: "Timed out"});
		}
		else {
			res.status(200).json({ msg: "Success" });
		}
	} catch (ex) {
		res.status(403).json({ err: "Invalid" });
	}
});
