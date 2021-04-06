const mongoose = require("mongoose");

var dummyPresc = new mongoose.Schema({
  userId: String,
  prescprtionList: [
    {
      date: Date,
      doctorName: String,
      Hospital: String,
      medicines: [
        {
          name: String,
          doses: {
            morning: Number,
            afternoon: Number,
            night: Number
          },
          foodTime: String,
          description: String
        }
      ]
    }
  ]
});

var dummyPresription = mongoose.model("dummyPresription", dummyPresc);
module.exports = dummyPresription;
