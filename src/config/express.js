'use strict';

var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var helmet         = require('helmet');
var multer         = require('multer');
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var pathUtils      = require('../utils/path-utils');
var config         = require('./config');

function initMiddleware(app) {
    app.set('showStackError', true);

    app.enable('jsonp callback');

    if (config.environment === 'development') {
        app.use(morgan('dev'));
        app.set('view cache', false);
    } else if (config.environment === 'production') {
        app.locals.cache = 'memory';
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(multer({
        dest: './uploads/',
        inMemory: config.uploadFilesInMemory
    }));

    app.use('/uploads', express.static(path.resolve('./uploads')));
}

function initHelmetHeaders(app) {
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');
}

function initCrossDomain(app) {
    app.use(cors());
    app.use(function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');
        next();
    });
}

function initGonfig(app) {
    pathUtils.getGlobbedPaths(path.join(__dirname, '../components/**/*_config.js')).forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
}

function initRoutes(app) {
    pathUtils.getGlobbedPaths(path.join(__dirname, '../components/**/*_routes.js')).forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
}

function initErrorRoutes(app) {
    app.use(function (err, req, res, next) {
        if (!err) return next();
        console.log('Internal error(%d): %s', res.statusCode, err.stack);
        res.sendStatus(500);
    });

    app.use(function (req, res) {
        res.sendStatus(404);
    });
}

function init() {
    var app = express();

    initMiddleware(app);
    initHelmetHeaders(app);
    initCrossDomain(app);
    initGonfig(app);
    initRoutes(app);
    initErrorRoutes(app);

    return app;
}

module.exports.init = init;