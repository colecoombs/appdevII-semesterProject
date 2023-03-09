// Author: C. Coombs    Date: 02/28/2023
//
// Api route for users
//
// Modification Log

const bcrypt = require('bcrypt');
const jwt = require("jwt-simple");


const router = require("express").Router();
const conn = require("../db");

const secret = "supersecret";

router.get('/list', (req, res) => {
    let qry = 'select * from users';
    console.log(`The query: ${qry}`);

    let userData = [req.body.email,
                    ]

    conn.query(qry, (err, rows) => {

        console.log(`error: ${err}`);
        if(err) return res.status(500).json({error: err});

        console.log(`no error`);
        // Check if database is empty
        if (rows.length == 0)
            res.status(400).json({msg: 'No users found'});

        // Database is not empty
        else {
            let user = req.body.email;
            // For loop through all users to check for matching emails
            for (let row of rows) {
                // Check if user is in database
                if (user == row.email) {
                    let hash = req.body.password;
                    let password = row.password;
                    if (hash == password) {
                        console.log("Login successful");

                    }
                    // Invalid credentials
                    else {
                        res.status(400).json({msg: 'Invalid login'});
                    }
                }
                // User not found
                else {
                    res.status(400).json({msg: 'Invalid login'});
                }
            }
        }
    })
})

router.post('/auth', (req, res) => {
    let qry = 'select email, password from users where email=?';
    console.log(`User: ${req.body.email} password: ${req.body.password}`);
    conn.query(qry, [req.body.email], (err, rows) => {

        let hash = bcrypt.hashSync(req.body.password, 10);

        // Server error
        if (err) {
            res.status(500).json({msg: 'Server error'});
        }

        // User found
        else if (rows.length !== 0) {

            let user = rows[0];
            let password = user.password;

            if (bcrypt.compareSync(password, hash)) {
                const token = jwt.encode({username: user.email}, secret);
                console.log(token);
                res.status(200).json({token: token, msg: 'Successful'});


            }
            else {
                res.status(400).json({msg: 'Invalid login'});
            }
        }

        // User not found
        else {
            console.log('User not found');
            res.status(500).json({msg: 'User not found'});
        }
    })
})

module.exports = router;