const utilsService = require("../services/utils");
module.exports = {
    getProducts: () => {
        return utilsService.getProducts();
    },
    getProductPackagings: () => {
        return utilsService.getProductPackagings();
    },
};
