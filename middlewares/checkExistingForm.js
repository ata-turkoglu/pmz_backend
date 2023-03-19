const activityFormController = require("../controllers/activityForms");

module.exports = (req, res, next) => {
  const { facility, date, shift } = req.body;
  activityFormController.getForm(facility, date, shift).then((result) => {
    if (result.length <= 0) {
      next();
    } else {
      res.status(200).send({ error: "Bu tarih ve vardiya girilmiş" });
    }
  });
};
