/**
 * Projet      : Club Website
 * Fichier     : src/server.js
 * Auteur      : Freezer64
 * Code        : CW-CORE-001
 * Description : Point d'entrée serveur HTTP.
 * Créé le     : 2025-12-10T23:12:00Z
 */

require("dotenv").config();

var http = require("http");
var app = require("./app");
var config = require("../config/default");
var logger = require("./utils/logger");

var port = config.app.port || 3001;

var server = http.createServer(app);

server.listen(port, function () {
  logger.info("🚀 [CW-CORE-001] Serveur démarré sur le port " + port, {
    env: config.app.env
  });
});

server.on("error", function (error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var context = { code: error.code, port: port };

  if (error.code === "EACCES") {
    logger.error("⛔ Port nécessite des privilèges élevés", context);
    process.exit(1);
  } else if (error.code === "EADDRINUSE") {
    logger.error("⛔ Port déjà utilisé", context);
    process.exit(1);
  } else {
    throw error;
  }
});
