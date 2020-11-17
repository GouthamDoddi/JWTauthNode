const jwt = require('json-web-token');
const express = require('express');
const getUser = require('../db/getUser');
const Bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res) => {
    const result = await checkUser(req.body.username);


    if (result.rowCount > 0) {
        console.log('found');

        comparePasswords(result.rows[0].password, req.body.password);
    } else {
        console.log('No user found');
        console.log(result);
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

async function comparePasswords (encryptedPassword, password) {
    await Bcrypt.compare(password, encryptedPassword).then(
        onfullfilled => console.log(onfullfilled),
        rejected => console.log(rejected),
    );
    //     return { error: true, msg: 'invalid password' };

    // // const token = jwt.sign({ sub: data._id }, secret, {
    // //     expiresIn: 86400, // expires in 24 hours
    // // })
    // return 'User match!';
}

module.exports = router;
