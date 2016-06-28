'use strict';

var upload  = require('./upload_controller'),
    token   = require('../auth/token_controller');

function setUserRoutes(app) {
    app.route('/upload_image')
        .all(token.verifyToken)
        .post(upload.upload);
}

module.exports = setUserRoutes;