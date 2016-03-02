'use strict';

var user    = require('./user_controller'),
    token   = require('../auth/token_controller');

function setUserRoutes(app) {
    app.route('/users/me')
        .all(token.verifyToken)
        .get(user.getProfile)
        .put(user.putProfile);
}

module.exports = setUserRoutes;