// Author: C. Coombs    Date: 02/28/2023
//
// Api route for users
//
// Modification Log

const router = require("express").Router();
const conn = require("../db");

router.get('/list', (req, res) => {
    let qry = 'select * from users';
    console.log(`The query: ${qry}`);

    conn.query(qry, (err, rows) => {

        console.log(`error: ${err}`);
        if(err) return res.status(500).json({error: err});

        console.log(`no error`);
        if (rows.length == 0)
            res.status(400).json({msg: 'No users found'});

        else {

            let users =[];
            rows.forEach((row) => {
                let user = {
                    email: row.email,
                    lname: row.lname,
                    fname: row.fname,
                    dateCreated: new Date(row.dateCreated),
                    lastLogin: row.lastLogin
                }
                users.push(user);
            });
            res.status(200).json(users);
        }
    })
})

module.exports = router;