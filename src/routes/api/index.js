/**
 * Entrée principale de l'API.
 * Prépare un namespace /api/v1 pour la suite (containers, cards, etc.).
 */

const express = require("express");
const router = express.Router();

// Exemple de route API simple
router.get("/status", (req, res) => {
  res.json({
    api: "v1",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// TODO: plus tard :
// router.use("/containers", containersApiRouter);
// router.use("/cards", cardsApiRouter);

module.exports = router;
