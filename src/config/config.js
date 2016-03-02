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
    secret: 'easy-app',
    expiration: 60*60*24*7 //week
};

config.networks = {
    facebookSecret: 'ae7b3b7095e4cda06957afe4c942fce5',
    googleSecret: 'hwQ6-35WYacalZ-93IzJR2dT',
    twitterCredentials: {
        secret: 'CyTxVER7tp0LAxDELdOuifvINbHegDzAWiQYO1RwlRExHadB5D',
        key: 'EJJSHea8LxpsWIextcbDjVGVY'
    }
};

module.exports = config;
