require("dotenv").config();
const Imap = require("imap");
const { simpleParser } = require("mailparser");
const { getExcelData } = require("./readExcelDataFromMail");
console.log(process.env.MAIL_USER);

const imapConfig = {
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    host: process.env.MAIL_HOST,
};

const imap = new Imap(imapConfig);

imap.once("ready", () => {
    imap.openBox("INBOX", true, (err, box) => {
        if (err) throw err;
        imap.search(
            [
                ["FROM", process.env.READ_MAIL],
                "NEW",
                ["SINCE", "September 1, 2023"],
                ["HEADER", "SUBJECT", process.env.MAIL_SUBJECT],
            ],
            (error, results) => {
                const f = imap.fetch(results, {
                    bodies: "",
                });
                f.on("message", (msg, seqno) => {
                    msg.on("body", (stream) => {
                        simpleParser(stream, async (err, parsed) => {
                            /*                             console.log("date-- ", parsed.date);
                            console.log("from-- ", parsed.from.text);
                            console.log("subject-- ", parsed.subject); */
                            getExcelData(
                                parsed.attachments[0].content,
                                parsed.date
                            );
                        });
                    });
                    /* msg.once("attributes", (attrs) => {
                        //console.log("attrs", attrs);
                        //const { uid } = attrs;
                        imap.addFlags(uid, ["\\Seen"], () => {
                        console.log("Marked as read!");
                    }); 
                    });*/
                    msg.once("end", function () {
                        console.log("Finished");
                    });
                });
                f.once("error", function (err) {
                    console.log("Fetch error: " + err);
                });
                f.once("end", () => {
                    console.log("Done ferching all message!");
                    imap.end();
                });
            }
        );
    });
});

imap.connect();
