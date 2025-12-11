/**
 * Projet      : Club Website
 * Fichier     : src/routes/admin/admin.auth.routes.js
 * Auteur      : Freezer64
 * Code        : CW-API-AUTH-001
 * Description : Routes d'authentification admin.
 * Créé le     : 2025-12-11T00:35:00Z
 */

var express = require("express");
var router = express.Router();
var authService = require("../../services/auth.service");
var { isAuthenticated } = require("../../middlewares/auth.middleware");
var logger = require("../../utils/logger");

/**
 * POST /admin/login
 * Connexion admin.
 */
router.post("/login", async function (req, res, next) {
  try {
    var email = req.body.email;
    var password = req.body.password;

    logger.info("🔐 Tentative de connexion admin", { email: email });

    var user = await authService.login(email, password);

    if (!user || user.role !== "ADMIN") {
      logger.warn("❌ Connexion refusée");
      return res.status(401).json({ success: false, message: "Identifiants invalides" });
    }

    // Création de la session
    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    logger.info("👑 Admin connecté", { userId: user.id });

    res.json({ success: true, message: "Connexion réussie", user: req.session.user });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /admin/logout
 * Déconnexion admin.
 */
router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    logger.info("👋 Admin déconnecté");
    res.json({ success: true, message: "Déconnexion effectuée" });
  });
});

/**
 * GET /admin/profile
 * Route protégée (admin connecté requis)
 */
router.get("/profile", isAuthenticated, function (req, res) {
  res.json({
    success: true,
    profile: req.session.user
  });
});

module.exports = router;
