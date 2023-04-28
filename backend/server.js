const express = require("express");
const app = express();
const events = require("./data/event");
require('dotenv').config()

const port = process.env.PORT || 3001;


app.listen(port,console.log("Listening on port " + port ));

app.get("/", function (req, res) {
        res.send("Hello World");
});

app.get("/events", function (req, res) {
    res.send(events);
});

app.get("/events/:id" , (req, res) => {
    const specificEvent = events.find((index) => 
        index._id === req.params.id);
    res.send(specificEvent.title);
}) 

