/**
 * Projet      : Club Website
 * Fichier     : src/routes/api/index.js
 * Auteur      : Freezer64
 * Code        : CW-API-CORE-001
 * Description : Entrée principale de l'API (/api).
 * Créé le     : 2025-12-10T23:57:00Z
 */

var express = require("express");
var router = express.Router();

var usersRoutes = require("./users.routes");

/**
 * GET /api/status
 * Petit ping de l'API.
 */
router.get("/status", function (req, res) {
  res.json({
    api: "v1",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// Routes utilisateurs
router.use("/users", usersRoutes);

module.exports = router;
