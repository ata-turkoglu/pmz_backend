require("dotenv").config();
const XlsxPopulate = require("xlsx-populate");
const moment = require("moment");
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
    return new Promise((resolve) => {
        let formattedDate = moment(date).format("YYYY-MM-DD");
        let headers = mergeHeaders(data[4], data[5]);
        let rowList = data.slice(6, -9);
        let list = [];

        rowList.forEach((item) => {
            let obj = {};
            obj.workday = formattedDate;
            headers.forEach((header, index) => {
                let cellData;
                if (typeof item[index] == "string") {
                    cellData = item[index].trim();
                    cellData = cellData == "" ? null : cellData;
                } else {
                    cellData = item[index];
                }
                obj[stocktakingList[header]] = cellData ?? null;
            });
            list.push(obj);
        });
        resolve(list);
    });
};

const getExcelData = (attachment, date) => {
    const buffer = Buffer.from(attachment, "base64");
    return XlsxPopulate.fromDataAsync(buffer).then(async (workbook) => {
        let data = workbook.sheet("Stok").usedRange().value();
        return await readProductRows(data, date);
    });
};

module.exports = { getExcelData };
