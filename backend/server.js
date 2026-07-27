// server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

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

// Mount routes onto base paths
app.use("/api/auth", authRoutes); // /api/auth/register, /api/auth/login, /api/auth/me
app.use("/api/contacts", contactRoutes); // /api/contacts (CRUD)
app.use("/api/sos", sosRoutes); // /api/sos/trigger, /api/sos/history
app.use("/api/incidents", incidentRoutes); // /api/incidents (report + view)
app.use("/api/admin", adminRoutes); // /api/admin/stats, /api/admin/users

// Error handling middleware — MUST be after all routes
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(notFound); // catches unmatched routes (404)
app.use(errorHandler); // catches all thrown/passed errors

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
