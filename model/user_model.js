// models/Version.js

const mongoose = require('mongoose');

const userInfo = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  fcm_token: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  loginTime: {
    type: Date,
    default: Date.now()
  },
  account_createdAt: {
    type: Date,
    default: Date.now()
  },
  full_name: {
    type: String,
    required: true,
    default: null
  },
  is_verified: {
    type: Boolean
  },

});

//   module.exports = mongoose.model('Version', userInfo);


module.exports = mongoose.model('userInfo', userInfo);
