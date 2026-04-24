require("dotenv").config();

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var TodoModel = require("./model/todo.model");
var LeadModel = require("./model/lead.model");
var connectDB = require("./db");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

app.post("/addtodo", (req, res) => {
  var newTodo = new TodoModel({
    title: req.body.ntd,
    status: true,
    timeStamp: Date.now(),
  });
  newTodo.save();
});

app.get("/todos", (req, res) => {
  TodoModel.find().then((data) => {
    res.send(data);
  });
});

app.post("/addlead", (req, res) => {
  console.log(req.body);
  var newLead = new LeadModel(req.body);
  newLead.save().then(() => {
    res.send("Ipoindi");
  });
});

app.get("/", (req, res) => {
  res.send("aagara babu");
});

app.listen(process.env.PORT || 3600, () => {
  console.log("server 3600 port lo vintundi");
});
