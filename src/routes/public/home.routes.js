// src/routes/public/home.routes.js

const express = require("express");
const router = express.Router();

// Route GET / (page d'accueil)
router.get("/", function (req, res) {
  res.send("Bienvenue sur le site du club (route / OK)");
});

module.exports = router;
