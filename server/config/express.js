var path = require('path');
var bodyParser = require('body-parser');
var url = require('url');
var cors = require('cors');

var express = require('express');
var passport = require('passport');
var session = require('express-session');

var exceptions = require('../config/exceptions');

module.exports = function () {
    var logger = function (req, res, next) {
        console.log('logger: ', req.method, req.url);
        next();
    }

    var app = express();

    app.use(cors()) // cross plattform origin

    // 1) Log requests
    app.use(logger);

    // 2) Deliver static packages
    app.use(express.static('server/public'));

    app.use(bodyParser.json());

    // REST Api calls
    var userMiddleware = require('../app/routes/user.server.routes');
    userMiddleware(app);
    var articlesMiddleware = require('../app/routes/article.server.routes');
    articlesMiddleware(app);

    // Error handling
    app.use(function (err, req, res, next) {
        if (err instanceof exceptions.InputException)
            res.status(400).send(`${err.name}: ${err.message}`);
        else {
            res.status(500).send();
            console.log(err.stack);
        }

        next();
    });

    return app;
};
