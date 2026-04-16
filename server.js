var express = require("express");
var app = express();
var fs = require("fs");
app.set("view engine", "pug");

app.get("/home/:fullname", (req, res) => {
  res.render("index", { fullname: req.params.fullname });
});

var si = 0;
var ei = 20;
app.get("/movies", (req, res) => {
  var fd = fs.readFileSync("movies.json").toString();
  var movies = JSON.parse(fd).slice(si, ei);
  res.render("movies", { movies });
  // res.send(movies);
});

app.listen(3600, () => {
  console.log("server 3600 port lo vintundi");
});
