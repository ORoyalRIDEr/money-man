var mongoose = require('mongoose');
var db_access = require(__dirname + '/db_access')

module.exports = function () {
    if (db_access.url == '' || db_access.name == '') {
        console.log("MongoDB: Url or database name not set.");
        return false;
    }

    var db = mongoose.connect(`mongodb://${db_access.url}/${db_access.name}`);

    require('../app/models/article.server.model');
    require('../app/models/user.server.model');

    return db;
};