'use strict';

var User   = require('./user_model');

function getProfile(req, res) {
    User.findById(req.user, function(err, user) {
        res.send(user);
    });
}

function putProfile(req, res) {
    User.findById(req.user, function(err, user) {
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        user.displayName = req.body.displayName || user.displayName;
        user.email = req.body.email || user.email;
        user.save(function(err) {
            if(err) console.log(err);
            res.status(200).send({ message: 'User was successfully created' });
        });
    });
}

module.exports = {
    getProfile: getProfile,
    putProfile: putProfile
};
