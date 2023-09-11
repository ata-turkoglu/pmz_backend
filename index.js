const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const scheduler = require("node-schedule");

const activityForm = require("./router/activityForm");
const analysis = require("./router/analysis");
const chartData = require("./router/chartData");
const facilities = require("./router/facilities");
const process = require("./router/process");
const rawMaterials = require("./router/rawMaterials");
const users = require("./router/users");

const stocktakingController = require("./controllers/quartz/product/stocktaking");

dotenv.config();
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        //origin: "http://localhost:8080",
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

scheduler.scheduleJob("00 00 14 * * *", function () {
    stocktakingController.addStocktakingData();
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
