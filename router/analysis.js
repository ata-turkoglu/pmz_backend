const router = require("express").Router();
const analysisControllers = require("../controllers/analysis");

router.post("/save80Mesh", (req, res, next) => {
    return analysisControllers
        .save80Mesh(req.body)
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
