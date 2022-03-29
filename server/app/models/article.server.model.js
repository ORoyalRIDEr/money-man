var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    user: mongoose.Mixed,//mongoose.ObjectId,
    time: Date,
    category: String,
    price: Number
});

module.exports = mongoose.model('Article', articleSchema);