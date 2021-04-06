const mongoose = require("mongoose");
var preschema = new mongoose.Schema({
  hospital: String,
  date: Date,
  time: String,
  medicines: [
    {
      name: String,
      doses: {
        morning: Number,
        afternoon: Number,
        night: Number,
      },
      days: Number,
      description: String,
    },
  ],
});
var prescription = mongoose.model("prescription", preschema);

module.exports = prescription;
