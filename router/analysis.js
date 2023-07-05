const router = require("express").Router();
const analysisControllers = require("../controllers/analysis");

router.get("/get3060Mesh", (req, res, next) => {
    return analysisControllers
        .get3060Mesh()
        .then((result) => {
            res.status(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

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

router.put("/update3060Mesh", (req, res, next) => {
    return analysisControllers
        .update3060Mesh(req.body)
        .then((result) => {
            res.sendStatus(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.delete("/delete3060Mesh", (req, res, next) => {
    return analysisControllers
        .delete3060Mesh(req.body.id)
        .then((result) => {
            res.sendStatus(200).send(result);
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

router.get("/get180Mesh", (req, res, next) => {
    return analysisControllers
        .get180Mesh()
        .then((result) => {
            res.status(200).send(result);
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

router.put("/update180Mesh", (req, res, next) => {
    return analysisControllers
        .update180Mesh(req.body)
        .then((result) => {
            res.sendStatus(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

router.delete("/delete180Mesh", (req, res, next) => {
    return analysisControllers
        .delete180Mesh(req.body.id)
        .then((result) => {
            res.sendStatus(200).send(result);
            return next();
        })
        .catch((exception) => {
            console.log(exception);
            return next();
        });
});

module.exports = router;
