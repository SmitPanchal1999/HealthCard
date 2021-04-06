const mongoose = require("mongoose");
var specialities = new mongoose.Schema({
  speciality: String
});
var specialities = mongoose.model("specialitie", specialities);

module.exports = specialities;
