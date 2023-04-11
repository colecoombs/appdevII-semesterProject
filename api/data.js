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
	console.log("route called");
	if (!req.headers["x-auth"]) {
		res.status(403).json({ err: "Missing X-Auth header" });
	}
	const token = req.headers["x-auth"];

	const decoded = jwt.decode(token, config.secret);
	//console.log("1")
	//console.log("User", decoded.user);
	let qry = "select * from users where email=?";
	//console.log("fuck you")
	conn.query(qry, decoded.user, (err, rows) => {
		if (err) return res.status(500).json({error: err});
		//console.log(rows[0].lastLogin);
		//console.log(rows);
		const lastLogin = new Date(rows[0].lastLogin);
		const curDate = new Date();
		let timeDiff = curDate.getTime() - lastLogin.getTime();
		//console.log("Time Diff", timeDiff);
		if (timeDiff > config.expTime) {
			res.status(403).json({err: "Timed out"});
			//console.log("success");
			// add code to kill token
		}
		else {
			res.status(200).json({ msg: "Success" });
			//console.log("timed out");
		}
	});
	console.log("I'm still alive");
});
// 	try {
//         const decoded = jwt.decode(token, config.secret);
// 		console.log("1")
// 		console.log("User", decoded.user);
// 		let qry = "select * from users where email=?";
// 		console.log("fuck you")
// 		conn.query(qry, decoded.user, (err, rows) => {
// 			if (err) return res.status(500).json({error: err});
// 			console.log(rows[0].lastLogin);
// 			console.log(rows);
// 			const lastLogin = new Date(rows[0].lastLogin);
// 			const curDate = new Date();
// 			let timeDiff = curDate.getTime() - lastLogin.getTime();
// 			console.log("Time Diff", timeDiff);
// 			if (timeDiff > config.expTime) {
// 				res.status(200).json({msg: "Success"});
// 				console.log("success");
// 				// add code to kill token
// 			}
// 			else {
// 				res.status(403).json({ err: "Timed out" });
// 				console.log("timed out");
// 			}
// 		});
// 	} catch (ex) {
// 		res.status(403).json({ err: "Invalid" });
// 	}
// });

module.exports = router;

