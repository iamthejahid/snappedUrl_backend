// models/Version.js

const mongoose = require('mongoose');

const UserLogin = new mongoose.Schema({
  device_id: String,
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

//   module.exports = mongoose.model('Version', userLogin);


module.exports = mongoose.model('UserLogin', UserLogin);
