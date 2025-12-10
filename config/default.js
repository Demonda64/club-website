/**
 * Configuration principale de l'application.
 */

require("dotenv").config();

module.exports = {
  app: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
  },

  db: {
    host: process.env.DB_HOST || "",
    user: process.env.DB_USER || "",
    pass: process.env.DB_PASS || "",
    name: process.env.DB_NAME || "",
  },

  security: {
    jwtSecret: process.env.JWT_SECRET || "",
    sessionSecret: process.env.SESSION_SECRET || "",
  },
};
