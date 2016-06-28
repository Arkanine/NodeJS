var authentication = require('./auth_controller');

function setAuthenticationRoutes(app) {
    app.route('/auth/login').post(authentication.signin);
    app.route('/auth/signup').post(authentication.signup);
}

module.exports = setAuthenticationRoutes;