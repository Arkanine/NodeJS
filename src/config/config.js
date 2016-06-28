'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

config.uploadFilesInMemory = process.env.UPLOAD_FILES_IN_MEMORY || false;

config.server = {
    host: process.env.HOST || 'localhost',
    port: process.env.NODE_PORT || process.env.PORT || 3000
};

config.mongodb = {
    dbURI: 'mongodb://easy:az@ds061385.mongolab.com:61385/easy-db'
};

config.token = {
    secret: 'uliv-app',
    expiration: 60*60*24*7 //week
};

config.mailer = {
    key: 'key-3e615b71b19f150392f0af58a251e970',
    domain: 'pascalium.com',
    login: 'roman.z@pilgrimconsultiong.com',
    password: 'aaazzz'
};

module.exports = config;
