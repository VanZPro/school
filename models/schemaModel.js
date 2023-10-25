const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  phoneNumber: String,
  accountType: String,
  dailyLimit: Number,
  isPremium: Boolean,
  expirationDate: Date
});

module.exports = mongoose.model('User', userSchema);