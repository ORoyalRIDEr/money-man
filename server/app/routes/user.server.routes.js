var user = require('../controllers/user.server.controller')

module.exports = function(app) {
    app.post('/newuser', user.create);
    app.get('/checkUsername/:username', user.checkUsername);
}