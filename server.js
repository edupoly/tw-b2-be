require("dotenv").config();
var express = require("express");
var app = express();

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var connectDB = require("./db");

var todosRouter = require("./routes/todos.router");
var leadsRouter = require("./routes/leads.router");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

app.use("/todos", todosRouter);
app.use("/leads", leadsRouter);

app.listen(process.env.PORT || 3600, () => {
  console.log("server running on " + process.env.PORT);
});
