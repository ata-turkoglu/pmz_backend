const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const activityForm = require("./router/activityForm");
const facilities = require("./router/facilities");

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
