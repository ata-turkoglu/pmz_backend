const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const moment = require("moment");

const activityForm = require("./router/activityForm");
const analysis = require("./router/analysis");
const chartData = require("./router/chartData");
const facilities = require("./router/facilities");
const logs = require("./router/logs");
const process = require("./router/process");
const rawMaterials = require("./router/rawMaterials");
const users = require("./router/users");
const utils = require("./router/utils");

moment.locale("tr");

dotenv.config();
const app = express();
const port = 3000;

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
app.use("/utils", utils);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
