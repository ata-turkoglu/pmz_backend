const db = require("../db");
module.exports = {
    getProducts: () => {
        return db("products")
            .select()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
    getProductPackagings: () => {
        return db("product_packaging")
            .select()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
};
