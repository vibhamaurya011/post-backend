const mongoose = require('mongoose');

const tokenBlacklistSchema = mongoose.Schema({
  token: String,
  expirationDate: Date,
});

const BlackListModel = mongoose.model('TokenBlacklist', tokenBlacklistSchema);

module.exports = {BlackListModel}