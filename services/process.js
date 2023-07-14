const db = require("../db");

module.exports = {
    getReducerFeedingData: () => {
        return db("reducer_feeding")
            .select()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },

    addNewFeedingData: (data) => {
        return db("reducer_feeding")
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

    deleteReducerFeedingData: (id) => {
        return db("reducer_feeding")
            .del()
            .where({ id })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },
};
