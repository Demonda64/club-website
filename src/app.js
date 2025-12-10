const express = require("express");
const securityLoader = require("./loaders/security.loader");
const expressLoader = require("./loaders/express.loader");
const { initDB } = require("./repositories/db");

const app = express();

// Connexion immédiate à la base
initDB()
  .then(() => console.log("✔ Base connectée"))
  .catch((err) => console.error("❌ Erreur connexion BDD:", err.message));

securityLoader(app);
expressLoader(app);

module.exports = app;
