var article = require('../controllers/article.server.controller');
var exceptions = require("../../config/exceptions");

module.exports = function(app) {
    app.use((req, res, next) => {
        if (req.isAuthenticated())
            next();
        else
            throw new exceptions.InputException("NotAuthorized");
    });

    app.get('/firstEntryDate', article.firstEntry);
    app.get('/getCategories', article.getCategories);
    app.get('/getArticles/:year/:month?/:day?', article.get);
    app.post('/addArticle', article.add);
    app.delete('/:articleId', article.delete);
    app.get('/convertArticle', article.convertArticle);
}