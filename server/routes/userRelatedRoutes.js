const express = require("express");
const router = express.Router();
const user = require("../schemas/user");
const Prescription = require("../schemas/prescription");
const diagnose = require("../schemas/diagnose");
const reports = require("../schemas/labreport");

router.get("/getUserId/:fname/:lname/:userType/:dob", (req, res) => {
  // console.log(req.params);
  var { fname, lname, userType, dob } = req.params;
  var startPart = userType.charAt(0) + fname.substring(0, 2) + lname.charAt(0);
  var endPart =
    dob.substring(dob.length - 2, dob.length) +
    dob.substring(dob.length - 5, dob.length - 3);

  console.log("dob", new Date(dob));
  user
    .findOne({
      userId: {
        $regex: new RegExp("^" + userType.charAt(0).toUpperCase() + "."),
      },
      firstname: { $regex: new RegExp("^" + fname + "$", "i") },
      lastname: { $regex: new RegExp("^" + lname + "$", "i") },
      dob: new Date(dob),
    })
    .sort({ _id: -1 })
    .then((r) => {
      console.log(r);
      var middelPart = "not defined";
      console.log("check:", r);
      if (r == null) {
        console.log("mp set to default");
        middelPart = "0000";
        console.log("mp:", middelPart);
      } else {
        console.log("mp other");

        //get starting of middel in HEX
        var m1 = r.userId.substring(4, 6);
        console.log("m1:", m1);
        var m2 = parseInt(r.userId.substring(6, 8)) + 1;
        console.log("m2:", m2);
        if (m2 >= 100) {
          console.log("reset");
          m2 = 0;
          m1 = parseInt(m1, 16) + 1;
          m1 = m1.toString(16);
        }
        if (m2 < 10) {
          m2 = "0" + m2;
        }
        console.log("mp other");
        middelPart = m1 + m2;
        console.log("mp other", middelPart);
      }
      id = (startPart + middelPart + endPart).toUpperCase();

      console.log("getId:", id);
      res.status(200).json({
        userId: id,
      });
    });
});

router.get("/getusers", (req, res) => {
  user.find({ userId: { $regex: "^P.*" } }, function(err, users) {
    if (!err) {
      console.log("users", users);
      res.status(200).json({
        alluser: users,
      });
    }
  });
});
var arr = [];
router.get("/getDiagnosisList/:userId", (req, res) => {
  console.log("pres list uid:", req.params.userId);
  diagnose.find({ userId: req.params.userId }).then((list) => {
    console.log("diagnosis:", list);
    res.status(200).json({
      dList: list,
    });
  });
});

var myReports = [];
/* router.get("/getDetails/:pId/:reportIds", (req, res) => {
  console.log(req.params.pId);
  Prescription.findOne({ _id: req.params.pId }).then((pres) => {
    // reports.find({ _id: { $in: req.params.reportIds } }).then(r => {
    //   console.log(r);
    // });
    res.status(200).json({
      presc: pres,
      reports: "not available",
    });
  });
}); */
router.get("/getDetails/:pId/:reportIds", (req, res) => {

  console.log(req.params.pId);

  console.log(req.params.reportIds);

  Prescription.findOne({ _id: req.params.pId }).then((pres) => {

  

    if(req.params.reportIds== "null"){

      res.status(200).json({

        presc: pres,

        reports: "not available",

      });

    }else{

      reports.find({ _id: { $in: req.params.reportIds } }).then(r => {

      console.log(r);

      res.status(200).json({

        presc: pres,

        reports: r,

      });

    });

    

    }

    

  });

});


module.exports = router;
