require("dotenv").config();
const XlsxPopulate = require("xlsx-populate");
const moment = require("moment");
const stock = require("../../utils/helpers/stok");
//const stocktakingList = require("../../utils/helpers/stocktakingList");
const stocktakingList = JSON.parse(process.env.STOCK_HEADER_LIST);

const mergeHeaders = (first, second) => {
    let list = [];
    first.forEach((item, index) => {
        if (item) {
            second[index]
                ? list.push(item.trim() + " " + second[index].trim())
                : list.push(item.trim());
        } else {
            second[index] ? list.push(second[index].trim()) : "";
        }
    });
    return list;
};

const readProductRows = (data, date) => {
    let formattedDate = moment(date).format("YYYY-MM-DD");
    let headers = mergeHeaders(stock[4], stock[5]);
    let rowList = data.slice(6, -9);
    let list = [];

    rowList.forEach((item) => {
        let obj = {};
        obj.workday = formattedDate;
        headers.forEach((header, index) => {
            obj[stocktakingList[header]] = item[index] ?? null;
        });
        list.push(obj);
    });
    return list;
};

const getExcelData = (attachment, date) => {
    const buffer = Buffer.from(attachment, "base64");
    XlsxPopulate.fromDataAsync(buffer).then((workbook) => {
        let data = workbook.sheet("Stok").usedRange().value();
        console.log("-", readProductRows(data, date));
    });
};

module.exports = { getExcelData };
