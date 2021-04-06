const express = require("express");
const router = express.Router();
const labtest = require("../schemas/labtest");
const lab = require("../schemas/lab");
const chemist = require("../schemas/chemist");
const login = require("../schemas/login");
const user = require("../schemas/user");
const doctor = require("../schemas/doctor");

router.post("/register", async (req, res) => {
  console.log("Inside post register app.js");
  var usertype = req.body.user;

  if (usertype == "lab") {
    console.log("inside lab");
    var selecteditems = req.body.selectedItems;

    selecteditems.forEach((x) => {
      //console.log(x.item_text)
      //insert lab tests
      new labtest({
        userId: req.body.userid,
        test: x.item_text,
      }).save(function(err, data) {
        if (err) {
          console.log(err);
        }
      });
    });
    new lab({
      userId: req.body.userId,
      licence: req.body.licence,
      labname: req.body.labname,
      DOE: req.body.DOE,
      address: req.body.lab_address,
    }).save(function(err, data) {
      if (err) {
        console.log("oh no");
        res.status(500).json({
          isSucceed: false,
        });
      } else {
        console.log(data);
        res.status(200).json({
          success: true,
        });
      }
    });
  }
});

router.post("/registermedic", (req, res) => {
  var usertype = req.body.user;
  //lab insertion

  new chemist({
    userId: req.body.userId,
    licence: req.body.licence,
    shopname: req.body.labname,
    DOE: req.body.DOE,
    address: req.body.shop_address,
  }).save(function(err, data) {
    if (err) {
      console.log("oh no");
      res.status(500).json({
        isSucceed: false,
      });
    } else {
      console.log(data);
      res.status(200).json({
        success: true,
      });
    }
  });
});

router.get("/commonUserData/:uId", (req, res) => {
  user.findOne({ userId: req.params.uId }, function(err, data) {
    if (!err) {
      res.status(200).json({
        userData: data,
      });
    }
  });
});

router.get("/docData/:uId", (req, res) => {
  doctor.findOne({ userId: req.params.uId }, function(err, data) {
    if (!err) {
      res.status(200).json({
        docData: data,
      });
    }
  });
});

router.post("/registeruser", async (req, res) => {
  var { fname, lname, dob } = req.body;
  var userType = req.body.user;
  console.log(fname, lname, userType, dob);
  var id = "not defined";
  login
    .create({
      email: req.body.email,
      password: req.body.password,
      module: req.body.user,
      userId: req.body.userId,
    })
    .then((r) => {
      console.log("r:", r);
      user
        .create({
          userId: req.body.userId,
          firstname: req.body.fname,
          lastname: req.body.lname,
          address: req.body.address,
          contact: req.body.contact,
          dob: req.body.dob,
          blood: req.body.blood,
          email: req.body.email,
          userType: req.body.userType,
        })
        .then((u) => {
          res.status(200).json({
            success: true,
            user: u,
          });
        })
        .catch((err) => {
          console.log("user error", err);
        });
    })
    .catch((err) => {
      console.log("login err:", err);
    });
  // });
});

module.exports = router;
