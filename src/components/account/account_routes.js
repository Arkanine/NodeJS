'use strict';

var account = require('./account_controller'),
    token   = require('../auth/token_controller');

function setAccountRoutes(app) {
    app.route('/accounts/:id')
        .all(token.verifyToken)
        .get(account.getAccount)
        .put(account.putAccount);
}

module.exports = setAccountRoutes;