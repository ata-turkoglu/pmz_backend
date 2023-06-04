const coalServices = require("../../services/rawMaterials/coal");

const coalControllers = {
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
    getCoalData:()=>{
        return coalServices.getCoalData()
    }
};

module.exports = coalControllers;
