var User = require('mongoose').model('User');
var exceptions = require('../../config/exceptions');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(
    function (username, password, done) {
        User.findOne({ name: username }, function (err, user) {
            try {
                if (err) throw err;
                if (!user) throw new exceptions.InputException('UsernameDoesNotExist');
                bcrypt.compare(password, user.password, function (err, success) {
                    if (success)
                        return done(null, user);
                    else
                        return done(null, false);
                })
            } catch (e) { next(e); }
        })
    }));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports.create = function (req, res, next) {
    if (!req.body.name) throw new exceptions.InputException('UsernameMissing');
    if (!req.body.password) throw new exceptions.InputException('PasswordMissing');

    User.findOne({ name: req.body.name }, function (err, user) {
        try {
            if (err) throw err;
            if (user) throw new exceptions.InputException('UsernameAlreadyExists');

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, null, function (err, hash) {
                    try {
                        if (err) throw err;

                        User.insertMany({
                            name: req.body.name,
                            password: hash,
                            budget: 500
                        }).then(() => res.send())
                    } catch (e) { next(e); }
                });
            });

        } catch (e) { next(e); }
    })
}

module.exports.checkUsername = function (req, res, next) {
    if (!req.params.username) throw new exceptions.InputException('UsernameMissing');

    User.findOne({ name: req.params.username }, function (err, user) {
        try {
            if (err) throw err;
            if (user)
                throw new exceptions.InputException("UsernameAlreadyExists.");
            else
                res.send()

        } catch (e) { next(e); }
    })
}

exports.passport = passport;