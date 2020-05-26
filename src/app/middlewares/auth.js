const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = require('../../config/auth.json').secret;

const WithAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(400).send({Error: 'Token not provided'});
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) res.status(401).send({Error: 'Token invalid'});
            else {
                req.email = decoded.email;
                User.findOne({email: decoded.email})
                    .then(user => {
                        req.user = user;
                        next();
                    })
                    .catch(err => {
                        res.json(err);
                    });
            }
        });
    }
};

module.exports = WithAuth;
