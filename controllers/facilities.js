const facilitiesServices = require("../services/facilities");

module.exports = {
  getAll: () => {
    return facilitiesServices.getAll();
  },
};
