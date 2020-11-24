const jwt = require('jsonwebtoken');
const express = require('express');
const getUser = require('../db/getUser');
const Bcrypt = require('bcrypt');
const secret = '!@#DWe$%^gge&&**';
const winston = require('winston');

const router = express.Router();

// log4js helps us to create a logfile which contains all the info related
// loging activity. So we can can have data about all the activity that
// has ever happened.
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/login.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(),
                winston.format.json()),
        }),
    ],
});

// create th logger object

router.post('/', async (req, res) => {
    const result = await checkUser(req.body.username);


    if (result.rowCount) {
        // if rowCount > 0 .i.e if any user was matched
        console.log('found');
        logger.info('username is found in the database!');

        // since a user was found lets check if the passwords match
        await Bcrypt.compare(req.body.password, result.rows[0].password).then(
            onfullfilled => {
                console.log(onfullfilled);
                if (onfullfilled) {
                    console.log('User authenticated');
                    logger.info('passwords matched!, User authenticated !');

                    const token = jwt.sign({ sub: req.body.user_id }, secret, {
                        expiresIn: 86400, // expires in 24 hours
                    });

                    // res.statusCode(200);
                    res.json({
                        statusCode: 200,
                        message: 'User authorized',
                        token,
                    });
                    logger.info('user authorized!, 200');
                } else {
                    res.json({ statusCode: 401,
                        error: 'User unothorized',
                        msg: 'invalid password' });
                    logger.info('user unauthorized!, 401');
                }
            },
        );
    } else {
        console.log('No user found');
        res.json(' Error! User is not found.');
        logger.info('Username not found in database');
    }
});

async function checkUser (username) {
    // lets check if the user exists in db
    try {
        return await getUser(username);
    } catch (error) {
        logger.info(error);

        return error;
    }
}

module.exports = router;
