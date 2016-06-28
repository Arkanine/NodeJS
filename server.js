'use strict';

var config  = require('./src/config/config'),
    express = require('./src/config/express'),
    mongodb = require('./src/config/mongoose');

mongodb(function startServer() {
    var app = express.init();

    app.listen(config.server.port, function () {
        console.log('uLiv server started at http://%s:%s', config.server.host, config.server.port);
    });
});