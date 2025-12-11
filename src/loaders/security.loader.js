/**
 * Projet      : Club Website
 * Fichier     : src/loaders/security.loader.js
 * Auteur      : Freezer64
 * Code        : CW-SEC-001
 * Description : Middlewares de sécurité globaux (helmet, rate limiting).
 * Créé le     : 2025-12-10T23:35:00Z
 */

var helmet = require("helmet");
var rateLimit = require("express-rate-limit");
var logger = require("../utils/logger");

module.exports = function securityLoader(app) {
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  var limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true
  });

  app.use(limiter);

  logger.info("🛡 Middlewares de sécurité initialisés");
};
