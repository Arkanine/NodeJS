'use strict';

var Account = require('./account_model'),
    User    = require('../user/user_model'),
    async   = require('async');

module.exports = {
    getAccount: getAccount,
    putAccount: putAccount
};

function getAccount(req, res) {
    var accountId = req.params.id;

    async.waterfall([
        function(callback) {
            Account.findById(accountId, function(err, account) {
                callback(err, account)
            });
        },
        function(account, callback) {
            User.find({account_id: accountId}, function(err, users) {
                var accountWithUsers = {
                    account: account,
                    users: users
                };

                callback(err, accountWithUsers)
            });
        }
    ], function(err, account) {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        res.status(200).send(account);
    });
}

function putAccount(req, res) {
    var accountId = req.params.id;

    Account.findById(accountId, function(err, account) {
        if (!account) {
            return res.status(400).send({ message: 'Account not exist' });
        }
        account.email = req.body.email || account.email;
        account.save(function(err) {
            if(err) console.log(err);
            res.status(200).send({ message: 'Account was successfully updated' });
        });
    });
}