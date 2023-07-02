const analysisServices = require("../services/analysis.js");
module.exports = {
    save80Mesh: (data) => {
        let obj = {
            bigbag_no: parseInt(data.bigbagNo),
            p400: parseInt(data.p400),
            m212: parseInt(data.m212),
            m160: parseInt(data.m160),
            notes: data.notes,
        };

        return analysisServices.save80Mesh(obj);
    },
};
