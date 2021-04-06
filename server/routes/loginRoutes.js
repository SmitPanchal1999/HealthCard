const express = require("express");
const router = express.Router();
const login = require("../schemas/login");
const user = require("../schemas/user");
const dateFormater = require("date-format");

router.post("/login", (req, res) => {
  console.log("req body", req.body);
  login
    .findOne(
      {
        email: req.body.uname,
        password: req.body.password
      },
      {
        password: 0
      }
    )
    .then(r => {
      if (r == null) {
        res.status(200).json({
          success: false
        });
      } else {
        user
          .findOne({ userId: r.userId }, { userId: 0, _id: 0, __v: 0 })
          .then(u => {
            var d = u.toObject();
            d.dob = dateFormater.asString("dd/MM/yyyy", d.dob);
            console.log("json:", d);
            console.log("uisady:", u.toObject());
            
            res.status(200).json({
              success: true,
              userType: r.module,
              userData: d,
              userId: r.userId
            });
          });
      }
    });
});

module.exports = router;
