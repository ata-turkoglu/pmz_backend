const db = require("../db");

module.exports = {
    save80Mesh: (data) => {
        return db("analysis80mesh")
            .insert(data)
            .returning("id")
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
};
