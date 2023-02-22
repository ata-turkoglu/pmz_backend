require("dotenv").config();
var pg = require("knex")({
  client: "pg",
  connection: {
    host: process.env.POSTGRESQL_HOST,
    port: Number(process.env.POSTGRESQL_PORT),
    database: process.env.POSTGRESQL_USER,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
  },
});
module.exports = pg;
