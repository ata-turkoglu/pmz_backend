const router = require("express").Router();
const chartDataController = require("../controllers/chartData");

router.get("/daily", (req, res, next) => {
  const { facility, startDate, endDate } = req.query;
  return chartDataController
    .getDailyChartDataByDateRange(facility, startDate, endDate)
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
