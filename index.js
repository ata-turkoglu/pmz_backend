const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const activityForm = require("./router/activityForm");
const facilities = require("./router/facilities");
const users = require("./router/users");
const chartData = require("./router/chartData");
const rawMaterials = require("./router/rawMaterials");
const analysis = require("./router/analysis");

dotenv.config();
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        //origin: "http://localhost:8080",
        //origin: "*",
        origin: "https://pmzsart.web.app",
        credentials: true,
        allowHeaders: ["Content-Type"],
    })
);

app.use("/activity-forms", activityForm);
app.use("/facilities", facilities);
app.use("/users", users);
app.use("/chart-data", chartData);
app.use("/rawMaterials", rawMaterials);
app.use("/analysis", analysis);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
