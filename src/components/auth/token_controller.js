'use strict';

var jwt    = require('jwt-simple'),
    moment = require('moment'),
    config = require('../../config/config');

module.exports = {
    createToken: createToken,
    verifyToken: verifyToken
};

function verifyToken(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token, config.token.secret);
    }
    catch (err) {
        return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token has expired' });
    }
    req.account = payload.sub;

    next();
}

function createToken(account) {
    var payload = {
        sub: account._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.token.secret);
}
