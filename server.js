var express = require("express");
var app = express();
var fs = require("fs");
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/login", (req, res) => {
  var fd = JSON.parse(fs.readFileSync(__dirname + "/users.txt").toString());
  console.log(req.body);
  var k = fd.find((user) => {
    if (
      user.username === req.body.username &&
      user.password === req.body.password
    ) {
      return true;
    }
  });
  if (k) {
    var token = jwt.sign({ ...req.body }, "shhhhh...evariki cheppanu");
    res.send({ msg: "loginsuccess", token });
  } else {
    res.send({ msg: "loginfailed" });
  }
});

app.get("/movies", (req, res) => {
  var fd = fs.readFileSync("movies.json").toString();
  var movies = JSON.parse(fd);
  res.json(movies);
});

app.get("/issues", (req, res) => {
  var fd = fs.readFileSync("issues.txt").toString();
  var issues = JSON.parse(fd);
  res.json(issues);
});

app.get("/todos", (req, res) => {
  var fd = fs.readFileSync("todos.txt").toString();
  var todos = JSON.parse(fd);
  res.send(todos);
});

app.listen(3600, () => {
  console.log("server 3600 port lo vintundi");
});
