var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    password: String,
    budget: Number
});

module.exports = mongoose.model('User', userSchema);