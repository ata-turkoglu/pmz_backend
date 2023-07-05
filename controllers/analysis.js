const analysisServices = require("../services/analysis.js");
module.exports = {
    get3060Mesh: () => {
        return analysisServices.get3060Mesh().then((res) => {
            res.forEach((item) => {
                item.bigbagNo = item.bigbag_no;
                delete item.bigbag_no;
            });
            return res;
        });
    },

    save3060Mesh: (data) => {
        let obj = {
            bigbag_no: parseInt(data.bigbagNo),
            p600: data.p600,
            p400: data.p400,
            m212: data.m212,
            notes: data.notes,
        };

        return analysisServices.save3060Mesh(obj);
    },

    update3060Mesh: (data) => {
        let obj = {
            id: data.id,
            bigbag_no: parseInt(data.bigbagNo),
            p600: data.p600,
            p400: data.p400,
            m212: data.m212,
            notes: data.notes,
        };

        return analysisServices.update3060Mesh(obj);
    },

    delete3060Mesh: (id) => {
        return analysisServices.delete3060Mesh(id);
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

    get180Mesh: () => {
        return analysisServices.get180Mesh().then((res) => {
            res.forEach((item) => {
                item.bigbagNo = item.bigbag_no;
                delete item.bigbag_no;
            });
            return res;
        });
    },

    save180Mesh: (data) => {
        let obj = {
            bigbag_no: parseInt(data.bigbagNo),
            p212: data.p212,
            p160: data.p160,
            m90: data.m90,
            notes: data.notes,
        };

        return analysisServices.save180Mesh(obj);
    },

    update180Mesh: (data) => {
        let obj = {
            id: data.id,
            bigbag_no: parseInt(data.bigbagNo),
            p212: data.p212,
            p160: data.p160,
            m90: data.m90,
            notes: data.notes,
        };

        return analysisServices.update180Mesh(obj);
    },

    delete180Mesh: (id) => {
        return analysisServices.delete180Mesh(id);
    },
};
