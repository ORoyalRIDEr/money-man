var User = require('mongoose').model('User');

module.exports.create = function (req, res, next) {
    // check if name is submitted
    if (!req.body.name) {
        res.send("NoUsernameSubmitted");
        next();
    }

    // check if name already exists
    User.find({ name: req.body.name }, function(err, users) {
        if (err) throw err;

        if (users.length > 0) {
            res.send("UsernameAlreadyExists");
            next();
        }
        else {
            User.insertMany({
                name: req.body.name,
                budget: 500
            })
            res.send("UserCreated");
        }
    })
}