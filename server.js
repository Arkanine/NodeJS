'use strict';

var config  = require('./src/config/config');
var express = require('./src/config/express');
var mongodb = require('./src/config/mongoose');

mongodb(function startServer() {
    var app = express.init();

    app.listen(config.server.port, function () {
        console.log('Easy server started at http://%s:%s', config.server.host, config.server.port);
    });

    module.exports = app;
});
