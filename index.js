const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const scheduler = require("node-schedule");
const moment = require("moment");

const activityForm = require("./router/activityForm");
const analysis = require("./router/analysis");
const chartData = require("./router/chartData");
const facilities = require("./router/facilities");
const process = require("./router/process");
const rawMaterials = require("./router/rawMaterials");
const users = require("./router/users");

const stocktakingController = require("./controllers/quartz/product/stocktaking");

moment.locale("tr");

dotenv.config();
const app = express();
const port = 3000;

// Scheduler
const rule = new scheduler.RecurrenceRule();
rule.hour = 13;
rule.minute = 0;

const job = scheduler.scheduleJob(rule, function () {
    stocktakingController.addStocktakingData();
});

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

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
