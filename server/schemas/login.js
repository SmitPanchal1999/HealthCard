const mongoose = require("mongoose");
var loginschema = new mongoose.Schema({
  email: String,
  userId: String,
  password: String,
  module: String
});
var login = mongoose.model("login", loginschema);

module.exports = login;
