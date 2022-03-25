var path = require('path');
var bodyParser = require('body-parser');
var url = require('url');

var express = require('express');
var passport = require('passport');
var session = require('express-session');

module.exports = function () {
    var logger = function (req, res, next) {
        console.log('logger: ', req.method, req.url);
        next();
    }

    var app = express();
    // 1) Log requests
    app.use(logger);

    // 2) Deliver static packages
    app.use(express.static('server/public'));

    return app;
};
