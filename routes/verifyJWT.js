const jwt = require('jsonwebtoken');
const secret = '!@#DWe$%^gge&&**';
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    jwt.verify(res.token.token, secret, err => {
        if (err) {
            return res.json(
                {
                    name: 'TokenExpiredError',
                    message: 'jwt expired',
                    expiredAt: 1408621000,
                },
            );
        }

        return res.json({ status: 200,
            token: 'verified' });
    });
});
