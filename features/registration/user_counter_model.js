const mongoose = require('mongoose');


const counter = mongoose.Schema({
    _id: String,
    sequence_value: Number
});

module.exports = mongoose.model('Counter', counter);
