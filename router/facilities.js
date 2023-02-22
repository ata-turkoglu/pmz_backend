const router = require("express").Router();
const facilitiesController = require("../controllers/facilities");

router.get("/getAll", (req, res, next) => {
  return facilitiesController
    .getAll()
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
