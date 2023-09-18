// models/Version.js

const mongoose = require('mongoose');

const urlStoreModel = new mongoose.Schema({
    created_by: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true 
    },
    short_link: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    last_visited_at: {
        type: Date,
        default: Date.now(),
    },
    total_visit: {
        type: Number,
        default: 0,
    },

});

//   module.exports = mongoose.model('Version', userInfo);


module.exports = mongoose.model('urlStoreModel', urlStoreModel);
