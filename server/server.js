const express = require("express");
const app = express();
const http = require("http"); // Import http module to work with Socket.IO
const { Server } = require("socket.io"); // Import Socket.IO

// Middleware
app.use(express.json());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5001;

// Routes
const usersRoute = require("./routes/usersRoute");
const productsRoute = require("./routes/productsRoute");
const bidsRoute = require("./routes/bidsRoute");
const notificationsRoute = require("./routes/notificationsRoute");

app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationsRoute);

// Create HTTP server for both Express and Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO on the server
const io = new Server(server);

// Handle socket connections
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Handle joining a room
  socket.on("join_room", (data) => {
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
    socket.join(data); // Join a specific room
  });

  // Handle sending a message
  socket.on("send_message", (data) => {
    console.log(
      `Message from ${socket.id} in room ${data.room}: ${data.message}`
    );
    socket.to(data.room).emit("receive_message", data); // Emit message to others in the room
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Deployment config
const path = require("path");
__dirname = path.resolve();

// Start the server with both Express and Socket.IO
server.listen(port, () => {
  console.log(`Node/Express Server and Socket.IO running on port ${port}`);
});
