const mongoose = require("mongoose");
const mongooseValidator = require('mongoose-unique-validator')
var userschemas = new mongoose.Schema({
  userId: String,
  firstname: String,
  lastname: String,
  address: String,
  contact: String,
  dob: Date,
  blood: String,
  email: {type: String, required: true, unique: true},
  userType: String
});
userschemas.plugin(mongooseValidator)
var user = mongoose.model("user", userschemas);

module.exports = user;