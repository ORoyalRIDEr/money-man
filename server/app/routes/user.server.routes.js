var user = require('../controllers/user.server.controller')

module.exports = function(app) {
    app.post('/newUser', user.create);
    app.get('/checkUsername/:username', user.checkUsername);
    app.get('/isLoggedIn', user.isLoggedIn);
    app.post('/login', user.passport.authenticate('local'), user.login);
}