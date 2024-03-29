const router = require("express").Router();
const activityFormController = require("../controllers/activityForms");
const checkExistingForm = require("../middlewares/checkExistingForm");
const quartzWorkingHoursController = require("../controllers/quartz/workingHours");

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

router.post("/add", checkExistingForm, (req, res, next) => {
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

router.post("/quartz/working-hours", (req, res, next) => {
    return quartzWorkingHoursController
        .addWorkingHours(req.body)
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.get("/quartz/last-working-hours", (req, res, next) => {
    return quartzWorkingHoursController
        .getLastWorkingHoursData()
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
