// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const initializeSocket = require("./sockets/socketHandler");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// Test route
app.get("/", (req, res) => {
  res.send("SafeHer API is running...");
});

// Route files
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const sosRoutes = require("./routes/sosRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mapRoutes = require("./routes/mapRoutes");
const locationRoutes = require("./routes/locationRoutes");

// Mount routes onto base paths
app.use("/api/auth", authRoutes); // /api/auth/register, /api/auth/login, /api/auth/me
app.use("/api/contacts", contactRoutes); // /api/contacts (CRUD)
app.use("/api/sos", sosRoutes); // /api/sos/trigger, /api/sos/history
app.use("/api/incidents", incidentRoutes); // /api/incidents (report + view)
app.use("/api/admin", adminRoutes); // /api/admin/stats, /api/admin/users
app.use("/api/map", mapRoutes); // /api/map/safe-route, /api/map/nearby/police
app.use("/api/location", locationRoutes); // /api/location/update, /api/location/me

// Error handling middleware — MUST be after all routes
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(notFound); // catches unmatched routes (404)
app.use(errorHandler); // catches all thrown/passed errors

// --- Socket.IO setup ---
// We wrap the Express app in a raw http server, because Socket.IO needs
// to attach to the http server directly (not to the Express app object)
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // in production, replace with your actual frontend URL
    methods: ["GET", "POST"],
  },
});

// Register all socket event listeners (see sockets/socketHandler.js)
initializeSocket(io);

// Make `io` accessible inside controllers via req.app.get('io')
// e.g. in sosController: const io = req.app.get('io'); io.to(contactId).emit('sosAlert', {...})
app.set("io", io);

const PORT = process.env.PORT || 5000;

// IMPORTANT: listen on `server`, not `app`, so Socket.IO works
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
