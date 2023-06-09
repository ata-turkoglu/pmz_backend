const coalServices = require("../../services/rawMaterials/coal");

const coalControllers = {
    getCoalData: () => {
        return coalServices.getCoalData();
    },
    addCoalEntry: (data) => {
        let obj = {
            company_name: data.companyName,
            acceptance_date: data.dateTime,
            amount: data.amount,
            unit_price: data.unitPrice,
            total_price: data.totalPrice,
        };
        return coalServices.addCoalEntry(obj);
    },
    deleteCoalEntry: (id) => {
        return coalServices.deleteCoalEntry(id);
    },
};

module.exports = coalControllers;
