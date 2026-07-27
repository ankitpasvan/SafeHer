// middleware/errorMiddleware.js

// 1. Runs when no route matches the request (404 case)
// Place this AFTER all routes in server.js
const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error); // pass the error forward to errorHandler
};

// 2. Centralized error handler
// Express recognizes this as an error-handling middleware because it takes 4 params (err, req, res, next)
// Place this LAST in server.js, after everything else
const errorHandler = (err, req, res, next) => {
  // If a status code was already set (e.g. 400, 401, 404), use it. Otherwise default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle common Mongoose errors with clearer messages

  // Invalid MongoDB ObjectId (e.g. malformed :id in route param)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // Mongoose validation errors (e.g. required field missing)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Duplicate key error (e.g. email already registered)
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate value entered for ${Object.keys(err.keyValue)} field`;
  }

  res.status(statusCode).json({
    message,
    // Only show stack trace in development, never in production
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
