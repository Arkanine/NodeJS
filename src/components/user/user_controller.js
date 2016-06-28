'use strict';

var User   = require('./user_model');

module.exports = {
    getProfile:     getProfile,
    postProfile:    postProfile,
    putProfile:     putProfile,
    deleteProfile:  deleteProfile
};

function postProfile(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        res.status(200).send({ message: 'User was successfully created' });
    });
}

function getProfile(req, res) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        res.send(user);
    });
}

function putProfile(req, res) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        user.name       = req.body.name || user.name;
        user.gender     = req.body.gender || user.gender;
        user.birth      = req.body.birth || user.birth;
        user.weight     = req.body.weight || user.weight;
        user.height     = req.body.height || user.height;
        user.address    = req.body.address || user.address;

        user.save(function(err) {
            if (err) {
                return res.status(401).send({ message: err.message });
            }
            res.status(200).send({ message: 'User was successfully updated' });
        });
    });
}

function deleteProfile(req, res)  {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        user.remove(function(err) {
            if (err) {
                return res.status(401).send({ message: err.message });
            }
            res.status(200).send({ message: 'User was successfully deleted' });
        })
    });
}