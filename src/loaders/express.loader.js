/**
 * Projet      : Club Website
 * Fichier     : src/loaders/express.loader.js
 * Auteur      : Freezer64
 * Code        : CW-ROUT-CORE-001
 * Description : Configuration d'Express (parsers, statiques, routes, sessions, erreurs).
 * Créé le     : 2025-12-10T23:40:00Z
 */

var express = require("express");
var path = require("path");
var session = require("express-session");
var errorHandler = require("../middlewares/error.middleware");
var logger = require("../utils/logger");
var config = require("../../config/default");

// Routes
var publicRoutes = require("../routes/public/home.routes");
var adminRoutes = require("../routes/admin/admin.routes");
var adminAuthRoutes = require("../routes/admin/admin.auth.routes");
var adminContainersRoutes = require("../routes/admin/containers.routes");
var apiRoutes = require("../routes/api/index");

module.exports = function expressLoader(app) {
  // Parsing JSON & formulaire
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session (pour l'auth admin)
  app.use(
    session({
      secret: config.security.sessionSecret || "dev-secret-change-me",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // mettre true en HTTPS prod
        sameSite: "lax"
      }
    })
  );

  logger.info("💾 Session middleware initialisé");

  // Fichiers statiques (front)
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Santé du serveur
  app.get("/health", function (req, res) {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Routes publiques (site vitrine)
  app.use("/", publicRoutes);

  // Routes d'auth admin (login/logout/profile)
  app.use("/admin/auth", adminAuthRoutes);

  // Page de gestion des containers (protégée par middleware dans le routeur)
  app.use("/admin/containers", adminContainersRoutes);

  // Routes admin (dashboard & autres pages admin)
  app.use("/admin", adminRoutes);

  // API JSON
  app.use("/api", apiRoutes);

  // Middleware d'erreur global – toujours en dernier
  app.use(errorHandler);
};
