const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

const app = express();

const PORT = 5000;
connectDB();

// Middleware
app.use(express.json());

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// routes
