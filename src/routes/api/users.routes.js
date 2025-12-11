/**
 * Projet      : Club Website
 * Fichier     : src/routes/api/users.routes.js
 * Auteur      : Freezer64
 * Code        : CW-API-USR-001
 * Description : Routes API pour les utilisateurs (test de lecture BDD).
 * Créé le     : 2025-12-10T23:10:00Z
 */

var express = require("express");
var router = express.Router();
var userRepository = require("../../repositories/user.repository");
var logger = require("../../utils/logger");

/**
 * GET /api/users/test
 * - Vérifie la connexion à la base.
 * - Retourne la liste des utilisateurs.
 */
router.get("/test", function (req, res, next) {
  logger.info("👉 [CW-API-USR-001] Requête reçue sur /api/users/test", {
    ip: req.ip
  });

  userRepository.findAllUsers()
    .then(function (users) {
      logger.debug("📊 Utilisateurs récupérés depuis la BDD", {
        count: users.length
      });

      res.json({
        success: true,
        count: users.length,
        data: users
      });
    })
    .catch(function (err) {
      logger.error("💥 Erreur dans /api/users/test", { message: err.message });
      next(err);
    });
});

module.exports = router;
