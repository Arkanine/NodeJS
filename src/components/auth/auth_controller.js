'use strict';

var tokenCtrl   = require('./token_controller'),
    Account     = require('../account/account_model'),
    mailer      = require('../../utils/mail-utils');

module.exports = {
    signin: signin,
    signup: signup
};

function signin (req, res, next) {
    Account.findOne({ email: req.body.email }, '+password', function(err, account) {
        if (!account) {
            return res.status(401).send({ message: 'Invalid email and/or password' });
        }
        account.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: 'Invalid email and/or password' });
            }

            return res.send({ token: tokenCtrl.createToken(account) });
        });
    });
}

function signup (req, res, next) {
    Account.findOne({ email: req.body.email }, function(err, existingAccount) {
        if (existingAccount) {
            return res.status(409).send({ message: 'Email is already taken' });
        }
        var account = new Account({
            email: req.body.email,
            password: req.body.password
        });

        account.save(function(err, result) {
            if (err) {
                return res.status(500).send({ message: err.message });
            }

            var to      = req.body.email,
                title   = 'Thanks for registration!',
                content = 'Registration complete!';
            mailer.sendEmail(to, title, content);

            return res.send({ token: tokenCtrl.createToken(account) });
        });
    });
}