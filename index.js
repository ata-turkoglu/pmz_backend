const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
//const scheduler = require("node-schedule");
const scheduler = require("node-cron");
const moment = require("moment");
const logger = require("./logger");
const fs = require("fs");
const path = require("path");

const activityForm = require("./router/activityForm");
const analysis = require("./router/analysis");
const chartData = require("./router/chartData");
const facilities = require("./router/facilities");
const logs = require("./router/logs");
const process = require("./router/process");
const rawMaterials = require("./router/rawMaterials");
const users = require("./router/users");

const stocktakingController = require("./controllers/quartz/product/stocktaking");

moment.locale("tr");

dotenv.config();
const app = express();
const port = 3000;

// Scheduler
/* const rule = new scheduler.RecurrenceRule();
rule.hour = 13;
rule.minute = 10;

const job = scheduler.scheduleJob(rule, function () {
    logger.info("schedular triggered");
    stocktakingController.addStocktakingData();
}); */

let mailTask = scheduler.schedule(
    "0 * * * * *",
    () => {
        logger.info("schedular triggered");
        //stocktakingController.addStocktakingData();
    },
    {
        scheduled: false,
    }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        //origin: "*",
        origin: "https://pmzsart.web.app",
        credentials: true,
        allowHeaders: ["Content-Type"],
    })
);

app.use("/activity-forms", activityForm);
app.use("/analysis", analysis);
app.use("/chart-data", chartData);
app.use("/facilities", facilities);
app.use("/process", process);
app.use("/rawMaterials", rawMaterials);
app.use("/users", users);
app.use("/logs", logs);

app.listen(port, () => {
    let logFileDir = path.join(__dirname, "logs.log");
    if (fs.existsSync(logFileDir)) {
        logger.info("Log file is existing");
        logger.info("server started listening");
        mailTask.start();
    } else {
        fs.mkdirSync(logFileDir);
        logger.info("Log file was saved");
        console.log("The file was saved!");
        logger.info("server started listening");
        mailTask.start();
    }
    console.log(`Server is listening on port ${port}`);
    logger.info("yes");
});
