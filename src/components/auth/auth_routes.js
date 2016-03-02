var authentication = require('./auth_controller');

function setAuthenticationRoutes(app) {
    app.route('/auth/login').post(authentication.signin);
    app.route('/auth/signup').post(authentication.signup);
    app.route('/auth/facebook').post(authentication.facebook);
    app.route('/auth/twitter').post(authentication.twitter);
    app.route('/auth/google').post(authentication.google);
}

module.exports = setAuthenticationRoutes;