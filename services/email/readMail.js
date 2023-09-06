require("dotenv").config();
const Imap = require("imap");
const { simpleParser } = require("mailparser");
const { getExcelData } = require("./readExcelDataFromMail");
const moment = require("moment");
const Promise = require("bluebird");

const checkDate = (
    subjectDate /* 01.09.2023 */,
    lastDate /* 2023-09-01T00:00:00+03:00 */
) => {
    let mailDate = moment(subjectDate, "DD.MM.YYYY").format();
    return !lastDate ? true : mailDate > lastDate;
};

const readMails = (date) => {
    const imapConfig = {
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        host: process.env.MAIL_HOST,
    };

    const imap = new Imap(imapConfig);

    imap.connect();

    return new Promise((resolve) => {
        let mailList = [];
        imap.once("ready", () => {
            imap.openBox("INBOX", true, (err, box) => {
                if (err) {
                    console.log("Inbox Error", err);
                }
                try {
                    imap.search(
                        [
                            ["FROM", process.env.READ_MAIL],
                            "NEW",
                            ["SINCE", moment(date).locale("en").format("LL")],
                            ["HEADER", "SUBJECT", process.env.MAIL_SUBJECT],
                        ],
                        (error, results) => {
                            if (results.length > 0) {
                                const f = imap.fetch(results, {
                                    bodies: "",
                                });
                                f.on("message", (msg, seqno) => {
                                    msg.on("body", (stream) => {
                                        simpleParser(stream, (err, parsed) => {
                                            let parsedSubjectDate =
                                                parsed.subject.split(" ")[0];
                                            if (
                                                checkDate(
                                                    parsedSubjectDate,
                                                    date
                                                )
                                            ) {
                                                mailList.push({
                                                    content:
                                                        parsed.attachments[0]
                                                            .content,
                                                    subjectDate:
                                                        parsedSubjectDate,
                                                });
                                            }
                                        });
                                    });
                                    /* msg.once("attributes", (attrs) => {
                                        //console.log("attrs", attrs);
                                        //const { uid } = attrs;
                                        imap.addFlags(uid, ["\\Seen"], () => {
                                        console.log("Marked as read!");
                                    }); 
                                    });
                                    msg.once("end", function () {
                                        //console.log("Finished");
                                    });*/
                                });
                                f.once("error", function (err) {
                                    console.log("Fetch error: " + err);
                                });
                                f.once("end", () => {
                                    //console.log("Done ferching all message!");
                                    imap.end();
                                    resolve(mailList);
                                });
                            }
                        }
                    );
                } catch (error) {
                    console.log("Search Error", error);
                }
            });
        });
    }).then((mailList) => {
        let list = [];

        mailList.forEach((item) => {
            list.push(getExcelData(item.content, item.subjectDate));
        });
        return Promise.all(list);
    });
};

module.exports = { readMails };
