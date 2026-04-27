var express = require("express");
var router = express.Router();
var TodoModel = require("../model/todo.model");

router.post("/addtodo", (req, res) => {
  var newTodo = new TodoModel({
    title: req.body.ntd,
    status: true,
    timeStamp: Date.now(),
  });
  newTodo.save();
});

router.get("/", (req, res) => {
  TodoModel.find().then((data) => {
    res.send(data);
  });
});

module.exports = router;
