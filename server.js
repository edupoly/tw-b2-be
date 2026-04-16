var express = require("express");
var app = express();
var fs = require("fs");
app.set("view engine", "pug");

app.get("/home/:fullname", (req, res) => {
  res.render("index", { fullname: req.params.fullname });
});

app.get("/movies{/:si}{/:perpage}", (req, res) => {
  var startIndex = +req.params.si || 0;
  var perPage = +req.params.perpage || 10;

  console.log(req.params.perpage);
  var fd = fs.readFileSync("movies.json").toString();
  var movies = JSON.parse(fd).slice(startIndex, startIndex + perPage);
  res.render("movies", { movies, startIndex, perPage });
  // res.send(movies);
});

app.listen(3600, () => {
  console.log("server 3600 port lo vintundi");
});
