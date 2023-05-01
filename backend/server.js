const express = require("express");
const app = express();
const events = require("../frontend/src/event");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

const port = process.env.PORT || 5000;

app.use(cors());

connectDB();

app.use(express.json());

app.listen(port, console.log("Listening on port " + port));

app.get("/", function (req, res) {
  res.send("Hello World");
});
//using express routes
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/events", function (req, res) {
  res.json(events);
});
