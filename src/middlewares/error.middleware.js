/**
 * Projet      : Club Website
 * Fichier     : src/middlewares/error.middleware.js
 * Auteur      : Freezer64
 * Code        : CW-MW-001
 * Description : Middleware global de gestion des erreurs.
 * Créé le     : 2025-12-10T23:30:00Z
 */

var logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  logger.error("💥 Erreur non gérée", {
    path: req.path,
    method: req.method,
    message: err.message
  });

  var status = err.status || 500;

  res.status(status).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Une erreur interne est survenue."
        : err.message
  });
}

module.exports = errorHandler;
