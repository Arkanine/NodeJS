'use strict';

var config      = require('./config'),
    mongoose    = require('mongoose'),
    db          = mongoose.connection;

function createMongooseConnection(cb) {
    mongoose.connect(config.mongodb.dbURI);

    db.on('connected', function () {
        console.log('Mongoose connected to ' + config.mongodb.dbURI);
    });

    db.on('error', function (err) {
        console.log('Mongoose connection error: ' + err);
    });

    db.on('disconnected', function () {
        console.log('Mongoose disconnected');
    });

    db.once('open', function () {
        if(cb && typeof(cb) === 'function') {cb();}
    });

    process.on('SIGINT', function() {
        db.close(function () {
            console.log('Mongoose disconnected through app termination');
            process.exit(0);
        });
    });
}

module.exports = createMongooseConnection;