const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.error("Unhandled error", {
    path: req.path,
    method: req.method,
    message: err.message
  });

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === "production"
      ? "Une erreur interne est survenue."
      : err.message
  });
}

module.exports = errorHandler;
