var article = require('../controllers/article.server.controller');

module.exports = function(app) {
    app.get('/:userid/firstEntryDate', article.firstEntry);
    app.get('/:userid/getCategories', article.getCategories);
    app.get('/:userid/:year/:month?/:day?', article.get);
    app.post('/:userid', article.add);
    app.delete('/:userid/:articleId', article.delete);
    app.get('/convertArticle', article.convertArticle);
}