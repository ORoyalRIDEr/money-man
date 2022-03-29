var user = require('../controllers/user.server.controller')

module.exports = function(app) {
    app.post('/newuser', user.create);
}