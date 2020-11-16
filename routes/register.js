const express = require('express');
const bcrypt = require('bcrypt');

const insertUser = require('../db/insertUser');
const code = require('./hash');

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// the below code handels POST req to /register route
router.post('/', async (req, res) => {
    // first let us get the current time
    const currentTime = Math.floor(Date.now() / 1000);

    // using one line promises lets encrypt the password and
    // store it in a var
    // const encryptedPassword = bcrypt.hash(req.body.password, code).then(hash => hash,
    //     error => console.log(error));

    // now lets create an objects which has all the data for
    // inserting the user into db(register). We can insert/(register)
    // the user suing 'insertUser' function imported above
    const userCredentials = {
        userName: req.body.username,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        password: req.body.password,
        lastUpdated: currentTime,
    };

    try {
        const result = await insertUser(userCredentials);

        console.log(result);

        return res.status(201).json({
            message: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed!',
            result: error,
        });
    }
});

module.exports = router;
