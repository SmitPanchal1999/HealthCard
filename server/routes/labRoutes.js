const express = require("express");
const router = express.Router();
const multer = require("multer");
const diagnose = require("../schemas/diagnose");
const mkdirp = require("mkdirp");
const fs = require("fs");
const labreport = require("../schemas/labreport");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const dir = "/home/mj/hackathon_new/Hackathon/server/lol";

    callBack(null, "upload");
  },
  filename: (req, file, callBack) => {
    callBack(null, `health_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/upload/:userID/:labID/:daignoses_id",
  upload.array("files"),
  (req, res, next) => {
    console.log("upload::", req.files);
    console.log(req.params);
    const files = req.files;
    console.log(files);
    files.forEach((x) => {
      console.log("In file");
      labreport
        .create({
          labid: req.params.labID,
          userid: req.params.userID,
          report: x.filename,
          daignose_id: req.params.daignoses_id,
        })
        .then((data) => {
          console.log("ENtered successfully", data);
          diagnose.update(

            { _id: req.params.daignoses_id },

            { $set: { isreportuploaded: 1,reportIds:data._id } },

            function(err, res) {
              if (err){
                console.log(err);
              }
              console.log(res);
            }

          );
        });
    });
   /*  diagnose.update(
      { _id: req.params.daignoses_id },
      { $set: { isreportuploaded: 1 } },
      function(err, res) {}
    ); */
    
    if (!files) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send({ sttus: "ok" });
  }
);

router.get("/uploadedreport", (req, res) => {
  var aa = [];
  diagnose.find(
    { reportdNeeded: { $ne: null }, isreportuploaded: 1 },
    {
      symptoms: 1,
      reportdNeeded: 1,
      _id: 1,
      docName: 1,
      prescriptionId: 1,
      treatmentDesc: 1,
      userName: 1,
    },
    (err, docs) => {
      if (err) {
        res.status(200).json({
          ok: false,
        });
        console.log("ERR", err);
      }
      if (docs) {
        res.status(200).json({
          ok: true,
          docs: docs,
        });
        console.log("DOCS", docs);
      }
    }
  );
});
router.get("/getDiagnoses", (req, res) => {
  var aa = [];
  /*labreport.find({},{_id:0,daignose_id:1},
    (err,data)=>{
      console.log("data",data);
      aa.push(JSON.stringify(data[0]));
    });

  console.log("aa",aa);*/
  diagnose.find(
    { reportdNeeded: { $ne: null }, isreportuploaded: 0 },
    {
      symptoms: 1,
      reportdNeeded: 1,
      _id: 1,
      docName: 1,
      prescriptionId: 1,
      treatmentDesc: 1,
      userName: 1,
    },
    (err, docs) => {
      if (err) {
        res.status(200).json({
          ok: false,
        });
        console.log("ERR", err);
      }
      if (docs) {
        res.status(200).json({
          ok: true,
          docs: docs,
        });
        console.log("DOCS", docs);
      }
    }
  );
});

router.get("/download/:filename",(req,res)=>{
  const file="upload/"+req.params.filename;
  console.log(file);
  res.download(file);
})
module.exports = router;
