// models/Version.js

const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    app_version: String,
    isForce: Boolean,
    last_updated: Date,
  });
  
//   module.exports = mongoose.model('Version', versionSchema);
  

module.exports = mongoose.model('Version', versionSchema);
