var express = require("express");
var app = express();
var fs = require("fs");
var cors = require("cors");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var { v4: uuid } = require("uuid");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  console.log(req.body);
  var fd = JSON.parse(fs.readFileSync(__dirname + "/users.txt").toString());
  var k = fd.find((user) => {
    if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      return true;
    }
  });
  if (k) {
    //gen token
    var token = jwt.sign({ ...req.body }, "neekendu");
    res.send({ msg: "loginsuccess", token, username: req.body.username });
  } else {
    res.send({ msg: "loginfailed" });
  }
});

app.get("/todos", (req, res) => {
  console.log(req.headers.token);
  var k = jwt.verify(req.headers.token, "neekendu");
  console.log("token details");
  console.log(k);
  var fd = JSON.parse(fs.readFileSync(__dirname + "/todos.txt").toString());
  var userTodos = fd.filter((todo) => {
    if (todo.username === k.username) {
      return true;
    }
  });
  res.send(userTodos);
});

app.post("/todos", (req, res) => {
  console.log(req.headers.token);
  var k = jwt.verify(req.headers.token, "neekendu");
  console.log("token details");
  console.log(k.username);
  var fd = JSON.parse(fs.readFileSync(__dirname + "/todos.txt").toString());
  fd.push({
    title: req.body.todo,
    username: k.username,
    status: "notcompleted",
    id: uuid(),
  });
  fs.writeFileSync(__dirname + "/todos.txt", JSON.stringify(fd));
  res.send({ msg: "add ipoindi" });
});

app.delete("/todos/:id", (req, res) => {
  var fd = JSON.parse(fs.readFileSync(__dirname + "/todos.txt").toString());
  fd = fd.filter((todo) => {
    if (todo.id !== req.params.id) {
      return true;
    }
  });
  fs.writeFileSync(__dirname + "/todos.txt", JSON.stringify(fd));
  res.send({ msg: "delete ipoindi" });
});

app.put("/todos/:id", (req, res) => {
  console.log(req.body);
  var fd = JSON.parse(fs.readFileSync(__dirname + "/todos.txt").toString());
  fd = fd.map((todo) => {
    if (todo.id === req.params.id) {
      return req.body;
    } else {
      return todo;
    }
  });
  fs.writeFileSync(__dirname + "/todos.txt", JSON.stringify(fd));
  res.send({ msg: "updated" });
});

app.listen(3600, () => {
  console.log("server 3600 port lo vintundi");
});
