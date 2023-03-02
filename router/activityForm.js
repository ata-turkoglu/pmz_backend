const router = require("express").Router();
const activityFormController = require("../controllers/activityForms");

router.get("/getFacilityForms/:facility", (req, res, next) => {
  let facility = req.params.facility;
  return activityFormController
    .getFacilityActivityForms(facility)
    .then((result) => {
      res.status(200).send(result);
      return next();
    })
    .catch((exception) => {
      console.log(exception);
      return next();
    });
});

router.post("/add", (req, res, next) => {
  return activityFormController
    .addNew(req.body)
    .then((result) => {
      res.status(200).send(result);
      return next();
    })
    .catch((exception) => {
      console.log(exception);
      return next();
    });
});

router.put("/update", (req, res, next) => {
  return activityFormController
    .update(req.body)
    .then((result) => {
      res.status(200).send(result);
      return next();
    })
    .catch((exception) => {
      console.log(exception);
      return next();
    });
});

module.exports = router;
