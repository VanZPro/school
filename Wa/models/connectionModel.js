const mongoose = require('mongoose');
const chalk = require('chalk');

const config = require('../config/mainConfig.js');

let db = mongoose.connection;

mongoose.connect(config.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = db;