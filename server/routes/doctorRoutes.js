const express = require("express");
const router = express.Router();
const doctor = require("../schemas/doctor");
const prescription = require("../schemas/prescription");
const diagnosis = require("../schemas/diagnose");

router.post("/doctorExtraDetail", (req, res) => {
  console.log("Inside doctorExtraDetail");
  doctor
    .create({
      userId: req.body.userId,
      licence: req.body.licence,
      degree: req.body.degree,
      workPlace: req.body.work_place,
      workPlaceAdd: req.body.work_place_add,
      workPlaceContact: req.body.work_place_con,
      speciaities: req.body.specialities,
    })
    .then((data) => {
      console.log("Register Doctor Success" + data);
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("Error in app.js register doctor:" + err);
      res.status(500).json({
        isSucceed: false,
      });
    });
});

router.post("/addPrescription", (req, res) => {
  console.log("Inside addPrescription" + JSON.stringify(req.body.formData));
  prescription
    .create({
      //docId: req.body.docId,
      hospital: req.body.formData.hospital,
      //userId: req.body.formData.userId,
      date: req.body.formData.date,
      time: req.body.formData.time,
      medicines: req.body.medicines,
    })
    .then((data) => {
      console.log("Prescription created" + data);
      diagnosis
        .updateOne({ _id: req.body.dId }, { prescriptionId: data._id })
        .then((d) => {
          console.log(d);
          res.status(200).json({
            success: true,
          });
        });
    })
    .catch((err) => {
      console.log("Error in addPrescription:" + err);
      res.status(500).json({
        success: false,
      });
    });
  console.log("Exiting addPrescription");
});

router.post("/Add/Diagnosis", (req, res) => {
  console.log(req.body);
  console.log(req.body.symptoms.split(","));

  var rep =
    req.body.symptoms.split(",").length > 0
      ? req.body.symptoms.split(",")
      : undefined;

  var reports =
    req.body.reports.split(",").length > 0
      ? req.body.reports.split(",").length
      : undefined;
  console.log("REPORTS", reports);

  diagnosis
    .create({
      userId: req.body.pid,
      userName: req.body.uname,
      docId: req.body.docId,
      docName: req.body.dname,
      date: req.body.date,
      symptoms: req.body.symptoms.split(","),
      reportdNeeded: reports,
      prescriptionId: null,
      treatementDesc: "Not Provided",
      reportIds: null,
    })
    .then((p) => {
      console.log(p);
      res.status(200).json({
        diagnosisId: p._id,
        success: true,
      });
    });
});

router.get("/getPrescriptions/:id", (req, res) => {
  console.log(req.params.id);
  diagnosis.find(
    { userId: req.params.id },
    { prescriptionId: 1, reportdNeeded: 1, docId: 1 },
    (err, docs) => {
      if (err) {
        console.log("Err", err);
      }
      if (docs) {
        docs.forEach((x) => {
          console.log(x.prescriptionId);
          prescription.find(
            { _id: x.prescriptionId },
            { _id: 1, hospital: 1, time: 1, date: 1, prescriptionId: 1 },
            (err, data) => {
              if (err) {
                console.log("In 2nd Err", err);
              }
              if (data) {
                console.log("DATA", data);
                res.status(200).json({
                  ok: true,
                  docs: data,
                });
              }
              if (docs.length == 0) {
                res.status(203).json({
                  ok: false,
                });
              }
            }
          );
        });
      }
    }
  );
});

router.get("/getDocPatientPrescriptions/:docid", (req, res) => {
  console.log(req.params.docid);
  var tmp = [];
  diagnosis
    .find({ docId: req.params.docid }, { prescriptionId: 1 })
    .then((docs) => {
      //console.log("docs",docs)
      docs.forEach((x) => {
        //console.log("x",x)
        prescription.find({ _id: x.prescriptionId }).then((presc) => {
          //console.log("presc",presc)
          tmp.push("prec", presc);
          //console.log("push",JSON.stringify(tmp))
        });
      });
    });
  console.log("optsude", JSON.stringify(tmp));
  res.status(200).json({
    ok: true,
    data: tmp,
  });
});

router.get("/getdetailedPres/:id", (req, res) => {
  prescription.findOne({ _id: req.params.id }, (err, docs) => {
    res.status(200).json({
      ok: true,
      docs: docs,
    });
  });
});

module.exports = router;
