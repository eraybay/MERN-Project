const express = require("express");
const app = express();
const events = require("../frontend/src/event");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

app.use(cors());

connectDB();

app.listen(port, console.log("Listening on port " + port));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/events", function (req, res) {
  res.json(events);
});
