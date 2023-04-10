/*  File: load_journal.js
    Author: C. Coombs    
    Date: 03/28/2023

     Api route for journal data

     Modification Log: 
        
*/

const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const router = require("express").Router();
const conn = require("../db");
const config = require("../configuration/config.json");
const dayjs = require('dayjs');


router.get("/load_data", (req, res) => {
	if (!req.headers["x-auth"]) {
		res.status(403).json({ err: "Missing X-Auth header" });
	}
	const token = req.headers["x-auth"];
	try {
        const decoded = jwt.decode(token, config.secret);
        const curDate = new Date();
        let lastLogin = decoded.lastLogin;
        let timeDiff = curDate.getTime() - lastLogin.getTime();
        console.log(timeDiff);
		if (timeDiff > config.expTime) {
			res.status(200).json({msg: "Success"});
            // add code to kill token
		}
		else {
			res.status(403).json({ err: "Timed out" });
		}
	} catch (ex) {
		res.status(403).json({ err: "Invalid" });
	}
});

module.exports = router;

