const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const activityForm = require("./router/activityForm");
const facilities = require("./router/facilities");
const users = require("./router/users");
const chartData = require("./router/chartData");

dotenv.config();
const app = express();
const port = 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/activity-forms", activityForm);
app.use("/facilities", facilities);
app.use("/users", users);
app.use("/chart-data", chartData);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
