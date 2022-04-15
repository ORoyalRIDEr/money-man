var user = require('../controllers/user.server.controller')

module.exports = function(app) {
    app.post('/newUser', user.create);
    app.get('/checkUsername/:username', user.checkUsername);
}