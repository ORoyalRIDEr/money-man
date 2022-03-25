var express = require('./config/express');
var mongoose = require('./config/mongoose');

var db = mongoose();
var app = express();

if (db) {
    app.listen(8000, 'localhost');
    console.log('Server started');
}
else {
    console.log('Server not started')
}