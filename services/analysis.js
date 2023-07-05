const db = require("../db");

module.exports = {
    save3060Mesh: (data) => {
        return db("analysis3060mesh")
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

    get80Mesh: () => {
        return db("analysis80mesh")
            .select()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },

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

    update80Mesh: (data) => {
        return db("analysis80mesh")
            .update({
                bigbag_no: data.bigbag_no,
                p400: data.p400,
                m212: data.m212,
                m160: data.m160,
                notes: data.notes,
            })
            .where({ id: data.id })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },

    delete80Mesh: (id) => {
        return db("analysis80mesh")
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

    get180Mesh: () => {
        return db("analysis180mesh")
            .select()
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },

    save180Mesh: (data) => {
        return db("analysis180mesh")
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

    update180Mesh: (data) => {
        return db("analysis180mesh")
            .update({
                bigbag_no: data.bigbag_no,
                p212: data.p212,
                p160: data.p160,
                m90: data.m90,
                notes: data.notes,
            })
            .where({ id: data.id })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                console.log(error);
                return { error };
            });
    },

    delete180Mesh: (id) => {
        return db("analysis180mesh")
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
