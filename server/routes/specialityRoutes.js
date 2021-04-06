const express = require("express");
const router = express.Router();
const specialities = require("../schemas/speciality");

router.post("/getSpecialities", (req, response) => {
  console.log("Inside getSpecialities");
  specialities.distinct("speciality").then(specs => {
    if (specs != null) {
      response.json({
        specialityArray: specs
      });
    } else {
      response.json({});
    }
    console.log("==>In app.js" + JSON.stringify(specs));
  });

  console.log("Exiting getSpecialities");
});

router.post("/addSpecialities", req => {
  console.log("Inside addSpecialities");
  req.body.specialityArray.forEach(function(speciality) {
    new specialities({
      speciality: speciality
    }).save(function(err) {
      console.log("Error in addSpecialities:" + error);
    });
  });
  console.log("Exiting addSpecialities");
});

module.exports = router;
