const jwt = require('jsonwebtoken');
const express = require('express');
const getUser = require('../db/getUser');
const Bcrypt = require('bcrypt');
const secret = '!@#DWe$%^gge&&**';

const router = express.Router();

router.post('/', async (req, res) => {
    const result = await checkUser(req.body.username);


    if (result.rowCount) {
        // if rowCount > 0 .i.e if any user was matched
        console.log('found');

        // since a user was found lets check if the passwords match
        await Bcrypt.compare(req.body.password, result.rows[0].password).then(
            onfullfilled => {
                console.log(onfullfilled);
                if (onfullfilled) {
                    console.log('User authenticated');

                    const token = jwt.sign({ sub: req.body.user_id }, secret, {
                        expiresIn: 86400, // expires in 24 hours
                    });

                    console.log(token);

                    res.json({
                        message: 'User authorized',
                        token,
                    });
                }

                return { error: true, msg: 'invalid password' };
            },
        );
    } else {
        console.log('No user found');
        res.json(' Error! User is not found.');
    }
});

async function checkUser (username) {
    // lets check if the user exists in db
    try {
        return await getUser(username);
    } catch (error) {
        return error;
    }
}

module.exports = router;
