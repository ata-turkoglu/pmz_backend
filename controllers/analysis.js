const analysisServices = require("../services/analysis.js");
module.exports = {
    save3060Mesh: (data) => {
        let obj = {
            bigbag_no: parseInt(data.bigbagNo),
            notes: data.notes,
        };

        return analysisServices.save3060Mesh(obj);
    },

    get80Mesh: () => {
        return analysisServices.get80Mesh().then((res) => {
            res.forEach((item) => {
                item.bigbagNo = item.bigbag_no;
                delete item.bigbag_no;
            });
            return res;
        });
    },

    save80Mesh: (data) => {
        let obj = {
            bigbag_no: parseInt(data.bigbagNo),
            p400: data.p400,
            m212: data.m212,
            m160: data.m160,
            notes: data.notes,
        };

        return analysisServices.save80Mesh(obj);
    },

    update80Mesh: (data) => {
        let obj = {
            id: data.id,
            bigbag_no: parseInt(data.bigbagNo),
            p400: data.p400,
            m212: data.m212,
            m160: data.m160,
            notes: data.notes,
        };

        return analysisServices.update80Mesh(obj);
    },

    delete80Mesh: (id) => {
        return analysisServices.delete80Mesh(id);
    },

    save180Mesh: (data) => {
        let obj = {
            bigbag_no: parseInt(data.bigbagNo),
            p400: parseInt(data.p212),
            m212: parseInt(data.p160),
            m160: parseInt(data.m90),
            notes: data.notes,
        };

        return analysisServices.save180Mesh(obj);
    },
};
