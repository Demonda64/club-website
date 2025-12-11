/**
 * Projet      : Club Website
 * Fichier     : src/routes/public/home.routes.js
 * Auteur      : Freezer64
 * Code        : CW-API-PUB-001
 * Description : Routes publiques (page d'accueil).
 * Créé le     : 2025-12-10T23:55:00Z
 */

var express = require("express");
var router = express.Router();

/**
 * GET /
 * Pour l'instant, renvoie un JSON de placeholder.
 */
router.get("/", function (req, res) {
  res.json({
    page: "home",
    message: "Page d'accueil du club - à implémenter avec les vues plus tard."
  });
});

module.exports = router;
