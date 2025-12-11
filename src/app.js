/**
 * Projet      : Club Website
 * Fichier     : src/app.js
 * Auteur      : Freezer64
 * Code        : CW-CORE-002
 * Description : Initialisation de l'application Express.
 * Créé le     : 2025-12-10T23:58:00Z
 */

var express = require("express");
var securityLoader = require("./loaders/security.loader");
var expressLoader = require("./loaders/express.loader");
var db = require("./repositories/db");
var logger = require("./utils/logger");

var app = express();

// Connexion à la base dès le démarrage
db.initDB()
  .then(function () {
    logger.info("🔌 [CW-CORE-002] Base de données initialisée");
  })
  .catch(function (err) {
    logger.error("❌ [CW-CORE-002] Erreur d'initialisation BDD", {
      message: err.message
    });
  });

// Middlewares de sécurité
securityLoader(app);

// Config Express (parsers, routes, erreurs)
expressLoader(app);

module.exports = app;
