require("dotenv").config();
const XlsxPopulate = require("xlsx-populate");
const moment = require("moment");
const stocktakingList = JSON.parse(process.env.STOCK_HEADER_LIST);
const packagingList = JSON.parse(process.env.PACKAGE_HEADER_LIST);

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
const getFileExtension = (filename) => {
    let index = filename.lastIndexOf(".");
    let ext = filename.slice(index);
    return ext;
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
const readPackagingRows = (data, date) => {
    let dateObj = new Date(date);
    let converted =
        25569.0 +
        (dateObj.getTime() - dateObj.getTimezoneOffset() * 60 * 1000) /
            (1000 * 60 * 60 * 24);
    return new Promise((resolve) => {
        let formattedDate = moment(date).format("YYYY-MM-DD");
        let headers = mergeHeaders(data[0], data[1]);
        let rowList = data.filter((itm) => itm[0] == converted);
        let list = [];

        rowList.forEach((item) => {
            let obj = {};
            headers.forEach((header, index) => {
                let cellData;
                if (typeof item[index] == "string") {
                    cellData = item[index].trim();
                    cellData = cellData == "" ? null : cellData;
                } else {
                    cellData = item[index];
                }
                obj[packagingList[header]] = cellData ?? null;
                obj.workday = formattedDate;
            });
            list.push(obj);
        });
        resolve(list);
    });
};

const getExcelData = async (
    attachment,
    subjectDate,
    filename,
    dates /* 2023-09-01T00:00:00+03:00 */
) => {
    console.log("getExcelData", getExcelData);
    let producing = null;
    let packaging = null;

    let date = moment(subjectDate, "DD.MM.YYYY").format(); //2023-09-02T14:00:13.000Z

    const buffer = Buffer.from(attachment, "base64");

    if (getFileExtension(filename) == ".xlsx") {
        producing =
            date > dates.lastDateOfProducing
                ? await XlsxPopulate.fromDataAsync(buffer).then(
                      async (workbook) => {
                          let data = workbook.sheet("Stok").usedRange().value();
                          return await readProductRows(data, date);
                      }
                  )
                : null;

        packaging =
            date > dates.lastDateOfPackaging
                ? await XlsxPopulate.fromDataAsync(buffer).then(
                      async (workbook) => {
                          let data = workbook
                              .sheet("Paketleme")
                              .usedRange()
                              .value();
                          return await readPackagingRows(data, date);
                      }
                  )
                : null;
    }

    return { producing, packaging };
};

module.exports = { getExcelData };
