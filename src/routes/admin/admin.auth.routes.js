/**
 * Projet      : Club Website
 * Fichier     : src/routes/admin/admin.auth.routes.js
 * Auteur      : Freezer64
 * Code        : CW-API-AUTH-001
 * Description : Routes d'authentification admin (formulaire + API).
 * Créé le     : 2025-12-11T00:35:00Z
 */

var express = require("express");
var router = express.Router();
var authService = require("../../services/auth.service");
var authMiddleware = require("../../middlewares/auth.middleware");
var logger = require("../../utils/logger");

/**
 * GET /admin/auth/login
 * Affiche un formulaire de connexion admin (HTML).
 */
router.get("/login", function (req, res) {
  var html = ""
    + "<!doctype html>"
    + "<html lang='fr'>"
    + "<head>"
    + "  <meta charset='utf-8' />"
    + "  <title>Connexion admin 🔐</title>"
    + "  <meta name='viewport' content='width=device-width, initial-scale=1' />"
    + "  <style>"
    + "    body { font-family: sans-serif; background:#0f172a; color:#e5e7eb;"
    + "           display:flex; justify-content:center; align-items:center;"
    + "           height:100vh; margin:0; }"
    + "    .card { background:#111827; padding:2rem; border-radius:1rem;"
    + "            box-shadow:0 10px 30px rgba(0,0,0,0.5); width:360px; }"
    + "    h1 { text-align:center; margin-bottom:1rem; }"
    + "    label { margin-top:0.75rem; display:block; }"
    + "    input { width:100%; padding:0.5rem; margin-top:0.25rem;"
    + "            border-radius:0.375rem; background:#020617; color:#e5e7eb;"
    + "            border:1px solid #374151; }"
    + "    button { margin-top:1rem; width:100%; padding:0.6rem;"
    + "             border:none; border-radius:0.5rem;"
    + "             background:#2563eb; color:white; font-weight:600; cursor:pointer; }"
    + "    #msg { margin-top:0.75rem; min-height:1.2em; text-align:center; }"
    + "  </style>"
    + "</head>"
    + "<body>"
    + "  <div class='card'>"
    + "    <h1>Connexion admin 🔐</h1>"
    + "    <form id='loginForm'>"
    + "      <label for='email'>Email</label>"
    + "      <input id='email' name='email' type='email' required />"
    + "      <label for='password'>Mot de passe</label>"
    + "      <input id='password' name='password' type='password' required />"
    + "      <button type='submit'>Se connecter</button>"
    + "      <div id='msg'></div>"
    + "    </form>"
    + "  </div>"
    + "  <script src='/auth/login.js'></script>"
    + "</body>"
    + "</html>";

  res.send(html);
});

/**
 * POST /admin/auth/login
 * Connexion admin (API).
 */
router.post("/login", async function (req, res, next) {
  try {
    var email = req.body.email;
    var password = req.body.password;

    logger.info("🔐 Tentative de connexion admin", { email: email });

    var user = await authService.login(email, password);

    if (!user || user.role !== "ADMIN") {
      logger.warn("❌ Connexion refusée (identifiants invalides ou rôle non admin)");
      return res.status(401).json({
        success: false,
        message: "Identifiants invalides"
      });
    }

    // Création de la session
    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    logger.info("👑 Admin connecté", { userId: user.id });

    res.json({
      success: true,
      message: "Connexion réussie",
      user: req.session.user
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /admin/auth/logout
 * Déconnexion admin.
 */
router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    logger.info("👋 Admin déconnecté");
    res.json({ success: true, message: "Déconnexion effectuée" });
  });
});

/**
 * GET /admin/auth/profile
 * Route protégée (admin connecté requis)
 */
router.get("/profile", authMiddleware.isAuthenticated, function (req, res) {
  res.json({
    success: true,
    profile: req.session.user
  });
});

module.exports = router;
