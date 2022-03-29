var article = require('../controllers/article.server.controller');

module.exports = function(app) {
    app.get('/:userid/:year/:month?/:day?', article.get);
    app.post('/:userid', article.add);
    app.get('/convertArticle', article.convertArticle);
}