const usersServices = require("../services/users");

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  getAll: () => {
    return usersServices.getAll();
  },

  updateUser: (data) => {
    return usersServices.updateUser(data);
  },

  signin: (data) => {
    if (data.password === data.confirmPassword) {
      return usersServices.signin(data);
    } else {
      return Promise.resolve({ error: "passwords doesnt match each other" });
    }
  },

  login: (data) => {
    return usersServices
      .login(data)
      .then((data) => {
        if (data.error) {
          return { error: data.error };
        } else {
          let token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600,
          });
          return { token };
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  passwordReset: (data) => {
    if (data.password === data.confirmPassword) {
      return usersServices.passwordReset(data);
    } else {
      return Promise.resolve({ error: "passwords doesnt match each other" });
    }
  },
};
