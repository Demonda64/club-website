// src/loaders/express.loader.js

const express = require("express");
const path = require("path");
const errorHandler = require("../middlewares/error.middleware");

// Routes
const publicRoutes = require("../routes/public/home.routes");
const adminRoutes = require("../routes/admin/admin.routes");
const apiRoutes = require("../routes/api/index");

module.exports = function expressLoader(app) {
  // Parsing JSON & formulaire
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Fichiers statiques (front)
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Santé du serveur
  app.get("/health", function (req, res) {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Routes publiques (site vitrine)
  app.use("/", publicRoutes);

  // Routes admin (back-office)
  app.use("/admin", adminRoutes);

  // API JSON
  app.use("/api", apiRoutes);

  // Middleware d'erreur global – toujours en dernier
  app.use(errorHandler);
};
