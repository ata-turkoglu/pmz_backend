const router = require("express").Router();
const activityFormController = require("../controllers/activityForms");

router.get("/getFacilityActivityForms/:facility", (req, res, next) => {
  let facility = req.params.facility;
  return activityFormController
    .getFacilityActivityForms(facility)
    .then((result) => {
      res.send(200, result);
      return next();
    })
    .catch((exception) => {
      console.log(exception);
      return next();
    });
});

module.exports = router;
