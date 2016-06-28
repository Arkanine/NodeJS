'use strict';

var user    = require('./user_controller'),
    token   = require('../auth/token_controller');

function setUserRoutes(app) {
    app.route('/users')
        .all(token.verifyToken)
        .post(user.postProfile);

    app.route('/users/:id')
        .all(token.verifyToken)
        .get(user.getProfile)
        .put(user.putProfile)
        .delete(user.deleteProfile);
}

module.exports = setUserRoutes;