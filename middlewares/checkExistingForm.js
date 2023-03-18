const activityFormController = require("../controllers/activityForms");

module.exports = (req, res, next) => {
  const { date, shift } = req.body;
  activityFormController.getForm(date, shift).then((result) => {
    if (result.length <= 0) {
      next();
    } else {
      res.status(200).send({ error: "Bu tarih ve vardiya girilmiş" });
    }
  });
};
