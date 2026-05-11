const express = require("express");
var http = require("http");
var { Server } = require("socket.io");

var app = express("app");
var server = http.createServer(app);
var io = new Server(server);
var liveCount = 0;
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  liveCount++;
  console.log("new connection happend", socket.id);
  console.log("Live Count::", liveCount);

  io.emit("usercount", { liveCount });

  socket.on("disconnect", () => {
    liveCount--;
    console.log("User gone", socket.id);
    console.log("Live Count::", liveCount);
    io.emit("usercount", { liveCount });
  });
});

server.listen(3600, () => {
  console.log("server running on 3600");
});
