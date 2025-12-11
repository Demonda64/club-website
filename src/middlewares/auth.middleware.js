/**
 * Projet      : Club Website
 * Fichier     : src/middlewares/auth.middleware.js
 * Auteur      : Freezer64
 * Code        : CW-MW-002
 * Description : Middleware d'authentification via session.
 * Créé le     : 2025-12-11T00:20:00Z
 */

var logger = require("../utils/logger");

/**
 * Vérifie si l'utilisateur est authentifié.
 */
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    logger.debug("🔐 Accès autorisé", { userId: req.session.user.id });
    return next();
  }

  logger.warn("🔒 Accès refusé : utilisateur non authentifié");

  return res.status(401).json({
    success: false,
    message: "Authentification requise."
  });
}

module.exports = {
  isAuthenticated: isAuthenticated
};
