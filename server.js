// Author: C. Coombs  Date: 02/23/2023
//
// Server created to use for the semester project
//
// Modification Log

const express = require('express');

const PORT = 3000;

const app = express();

const router = express.Router();

router.use(express.json());

router.use('/api/user', require('./api/users'));
router.use('/api/data', require('./api/data'));

app.use(router);

app.listen(PORT, err => {
    if (err)
        console.log("Server failed to start");
    else
        console.log(`Server started on port ${PORT}.`);
})