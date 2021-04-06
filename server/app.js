const express = require("express");
const bodyparser = require("body-parser");
const app = express();
// const multer = require("multer");
// const cookieParser = require("cookie-parser");
// const chemist = require("./schemas/chemist");
// const lab = require("./schemas/lab");
// const login = require("./schemas/login");
// const doctor = require("./schemas/doctor");
// const labtest = require("./schemas/labtest");
// const user = require("./schemas/user");

// const nJwt = require("njwt");
// const keys = require("./keyConfig");
const userRelatedRoutes = require("./routes/userRelatedRoutes");
const registerRoutes = require("./routes/registerRoutes");
const specialityRoutes = require("./routes/specialityRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const loginRoutes = require("./routes/loginRoutes");
const labroutes = require("./routes/labRoutes");
const specialities = require("./schemas/speciality");
const dateFormater = require("date-format");
const labreport = require("./schemas/labreport");
const Presc = require("./schemas/dummyPresc");
//var nodemailer = require('nodemailer');
//var rn = require('random-number');
//app.use(cookieParser());
app.use(bodyparser.json());
var options = {
  min: 1000,
  max: 9999,
  integer: true
};

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/user", userRelatedRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/speciality", specialityRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/lab", labroutes);
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/HealthCard", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log("Mongo connection error ", err));

app.listen(8000, () => console.log("server is listening at 8000"));
