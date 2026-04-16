var express = require("express");
var app = express();
var fs = require("fs");

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

app.listen(3600, () => {
  console.log("server 3600 port lo vintundi");
});
