const router = require("express").Router();
const usersController = require("../controllers/users");

router.get("/all", (req, res, next) => {
  return usersController
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

router.put("/update", (req, res, next) => {
  return usersController
    .updateUser(req.body)
    .then((result) => {
      res.status(200).send(result);
      return next();
    })
    .catch((exception) => {
      console.log(exception);
      return next();
    });
});

router.post("/signin", (req, res, next) => {
  return usersController
    .signin(req.body)
    .then((result) => {
      res.status(200).send(result);
      return next();
    })
    .catch((exception) => {
      console.log(exception);
      return next();
    });
});

router.post("/login", (req, res, next) => {
  return usersController
    .login(req.body)
    .then((result) => {
      res.status(200).send(result);
      return next();
    })
    .catch((exception) => {
      console.log(exception);
      return next();
    });
});

router.put("/password-reset", (req, res, next) => {
  return usersController
    .passwordReset(req.body)
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
