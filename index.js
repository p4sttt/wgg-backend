require("dotenv").config();

const express = require("express");
const app = express();
const cors = express("cors");

app.use(cors());

const http = require("http");

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`connected: ${socket.id}`);
});

app.get("/", (req, res) => {
  return res.status(200).json({ succes: true });
});

port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
