const db = require("../db");
module.exports = {
  getAll: () => {
    return db("facilities")
      .select()
      .then((result) => {
        return result;
      });
  },
};
