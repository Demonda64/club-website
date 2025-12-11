/**
 * Projet      : Club Website
 * Fichier     : config/default.js
 * Auteur      : Freezer64
 * Code        : CW-CONF-001
 * Description : Configuration principale de l'application.
 * Créé le     : 2025-12-10T23:20:00Z
 */

require("dotenv").config();

module.exports = {
  app: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3001
  },

  db: {
    host: process.env.DB_HOST || "",
    user: process.env.DB_USER || "",
    pass: process.env.DB_PASS || "",
    name: process.env.DB_NAME || ""
  },

  security: {
    jwtSecret: process.env.JWT_SECRET || "",
    sessionSecret: process.env.SESSION_SECRET || ""
  }
};
