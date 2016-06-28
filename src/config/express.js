'use strict';

var cors           = require('cors'),
    path           = require('path'),
    morgan         = require('morgan'),
    helmet         = require('helmet'),
    express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    pathUtils      = require('../utils/path-utils'),
    config         = require('./config');

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