const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);

//Cors
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  let user;
  //Notify connect user join chat
  socket.on("connected", (nameUser) => {
    user = nameUser;
    socket.broadcast.emit("notify", {
      user,
      message: `${user} ha entrado al chat`,
    });
  });

  //Emit message
  socket.on("message", (user, message) => {
    io.emit("messages", { user, message });
  });

  //disconnect user del chat
  socket.on("disconnect", () => {
    io.emit("notify", {
      server: "Server",
      message: `${user} ha salido del chat`,
    });
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
