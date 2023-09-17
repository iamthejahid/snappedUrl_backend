// models/Version.js

const mongoose = require('mongoose');

const UserLoginInforamtion = new mongoose.Schema({
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
});

//   module.exports = mongoose.model('Version', UserLoginInforamtion);


module.exports = mongoose.model('UserLoginInforamtion', UserLoginInforamtion);
