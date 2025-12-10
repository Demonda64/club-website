/**
 * Routes pour l'administration du site.
 * Protégées par le middleware d'authentification.
 */

const express = require("express");
const { isAuthenticated } = require("../../middlewares/auth.middleware");

const router = express.Router();

// GET /admin
router.get("/", isAuthenticated, (req, res) => {
  res.json({
    page: "admin-dashboard",
    message: "Dashboard admin - à remplacer par une vraie vue / API.",
    user: req.session ? req.session.user || null : null,
  });
});

module.exports = router;
