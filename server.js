var express = require("express");
var app = express();
var fs = require("fs");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var count = 0;
var todos = ["Go to Goa", "Play Cricket", "Pay bills"];

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/general"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var fd = JSON.parse(fs.readFileSync(__dirname + "/users.txt").toString());
  var x = fd.find((user) => {
    if (user.username == username && user.password == password) {
      return true;
    }
  });
  if (x) {
    res.cookie("username", username);
    res.cookie("password", password);
    res.send("Login success");
  } else {
    res.send("Sorry credentials didnt match");
  }
});

function checkCredentials(req, res, next) {
  var username = req.cookies?.username;
  var password = req.cookies?.password;
  console.log(username);
  console.log(password);
  var fd = JSON.parse(fs.readFileSync(__dirname + "/users.txt").toString());
  var x = fd.find((user) => {
    if (user.username == username && user.password == password) {
      console.log("HI");
      return true;
    }
  });
  console.log("x::", x);
  if (x) {
    next();
  } else {
    res.send({ msg: "loginFailed" });
  }
}

app.get("/getAllTickets", checkCredentials, (req, res) => {
  fs.readFile(__dirname + "/issues.txt", (err, data) => {
    res.send(data.toString());
  });
});

app.delete("/deleteTicket/:i", (req, res) => {
  fs.readFile(__dirname + "/issues.txt", (err, data) => {
    var issues = JSON.parse(data.toString());
    issues.splice(req.params.i, 1);
    fs.writeFile(
      __dirname + "/issues.txt",
      JSON.stringify(issues),
      function (err, dx) {
        res.send({ msg: "Deleted" });
      },
    );
  });
});
app.put("/updateTicketStatus/:i", (req, res) => {
  console.log(req.body);
  fs.readFile(__dirname + "/issues.txt", (err, data) => {
    var issues = JSON.parse(data.toString());
    issues[req.params.i].status = req.body.status;
    fs.writeFile(
      __dirname + "/issues.txt",
      JSON.stringify(issues),
      function (err, dx) {
        res.send({ msg: "updated" });
      },
    );
  });
});

app.post("/riseTicket", (req, res) => {
  // console.log(req.query);
  console.log(req.body); //please store your

  fs.promises.readFile(__dirname + "/issues.txt").then((data) => {
    var fd = JSON.parse(data.toString());
    fd.push({ ...req.body, status: "pending", timeStamp: Date.now() });
    fs.promises
      .writeFile(__dirname + "/issues.txt", JSON.stringify(fd))
      .then(() => {
        res.send("inka chala varieties unnai... meeku opika unte cheptha...");
      });
  });

  // fs.readFile(__dirname + "/issues.txt", (err, buf) => {
  //   if (err) {
  //     console.log("error vachindi pushpa");
  //   } else {
  //     var fd = JSON.parse(buf.toString());
  //     fd.push(req.body);
  //     fs.writeFile(
  //       __dirname + "/issues.txt",
  //       JSON.stringify(fd),
  //       (err, data) => {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           res.send("ticket add ipoindi");
  //         }
  //       },
  //     );
  //   }
  // });

  // reading and writing to file  synchronously is not a good idea in real world applications, but we are doing it here just for demonstration purpose
  // var fd = JSON.parse(fs.readFileSync(__dirname + "/issues.txt").toString());
  // fd.push(req.body);
  // fs.writeFileSync(__dirname + "/issues.txt", JSON.stringify(fd));
  // res.send("antha savyamgane indi");
});

app.get("/pushpa", checkCredentials, (req, res) => {
  res.sendFile(__dirname + "/pushpa.html");
});

app.get("/todos", (req, res) => {
  res.send(todos);
});
app.post("/todos", (req, res) => {
  todos.push(req.body.newTodo);
  res.send({ msg: "todo add indi" });
});

app.get("/count", (req, res) => {
  res.send(count);
});
app.get("/incCount", (req, res) => {
  res.send(++count);
});
app.get("/decCount", (req, res) => {
  res.send(--count);
});

app.get("/add/:x/:y", (req, res) => {
  var a = +req.params.x;
  var b = +req.params.y;
  res.send(a + b);
});

app.get("/sum", (req, res) => {
  var a = +req.query.a;
  var b = +req.query.b;
  res.send(a + b);
});

app.get("/addForm", (req, res) => {
  res.sendFile(__dirname + "/addForm.html");
});

app.get("/addCheyyara", (req, res) => {
  var a = +req.query.p;
  var b = +req.query.q;
  res.send(a + b);
});
app.post("/addCheyyara", (req, res) => {
  console.log(req.body);
  var a = +req.body.p;
  var b = +req.body.q;
  res.send(a + b);
});
app.listen(3600, () => {
  console.log("server 3600 port lo vintundi");
});
