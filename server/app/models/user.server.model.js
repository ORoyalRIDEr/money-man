var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    budget: Number
});

module.exports = mongoose.model('User', userSchema);