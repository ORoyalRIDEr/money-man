var User = require('mongoose').model('User');
var exceptions = require('../../config/exceptions');

module.exports.create = function (req, res, next) {
    if (!req.body.name) throw new exceptions.InputException('UsernameMissing');

    User.find({ name: req.body.name }, function (err, users) {
        try {
            if (err) throw err;
            if (users.length > 0) throw new exceptions.InputException('UsernameAlreadyExists');

            User.insertMany({
                name: req.body.name,
                budget: 500
            })

            res.send();
        } catch (e) { next(e); }
    })
}

module.exports.checkUsername = function (req, res, next) {
    if (!req.params.username) throw new exceptions.InputException('UsernameMissing');

    User.findOne({ name: req.params.username }, function (err, user) {
        try {
            if (err) throw err;
            if (user)
                res.status(406).send("Username already exists.")
            else
                res.send()

        } catch (e) { next(e); }
    })
}