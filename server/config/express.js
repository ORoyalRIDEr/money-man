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

    app.get('/users/:id', function (req, res) {
        var User = require('mongoose').model('User');

        User.find({ id: req.params.id }, function (err, users) {
            if (users.length > 0) {
                res.status(200).send(`Hello ${users[0].name}`);}
            else
                res.status(200).send(`Id ${req.params.id} not found`);
        });
    });

    return app;
};
