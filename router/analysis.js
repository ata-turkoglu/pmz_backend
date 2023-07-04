const router = require("express").Router();
const analysisControllers = require("../controllers/analysis");

router.post("/save3060Mesh", (req, res, next) => {
    return analysisControllers
        .save3060Mesh(req.body)
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.get("/get80Mesh", (req, res, next) => {
    return analysisControllers
        .get80Mesh()
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

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

router.put("/update80Mesh", (req, res, next) => {
    return analysisControllers
        .update80Mesh(req.body)
        .then((result) => {
            res.sendStatus(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.delete("/delete80Mesh", (req, res, next) => {
    return analysisControllers
        .delete80Mesh(req.body.id)
        .then((result) => {
            res.sendStatus(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.post("/save180Mesh", (req, res, next) => {
    return analysisControllers
        .save180Mesh(req.body)
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
