/**
 * Projet      : Club Website
 * Fichier     : src/routes/api/containers.routes.js
 * Auteur      : Freezer64
 * Code        : CW-API-CTN-001
 * Description : Routes API pour la gestion des containers.
 * Créé le     : 2025-12-11T02:25:00Z
 */

var express = require("express");
var router = express.Router();
var authMiddleware = require("../../middlewares/auth.middleware");
var containerService = require("../../services/container.service");
var logger = require("../../utils/logger");

// Toutes les routes containers nécessitent d'être authentifié
router.use(authMiddleware.isAuthenticated);

/**
 * GET /api/containers
 */
router.get("/", async function (req, res, next) {
  try {
    var containers = await containerService.listContainers();
    res.json({ success: true, data: containers });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/containers
 */
router.post("/", async function (req, res, next) {
  try {
    var user = req.session.user || null;
    var created = await containerService.createContainer(req.body, user ? user.id : null);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    logger.error("Erreur création container", { message: err.message });
    next(err);
  }
});

/**
 * PUT /api/containers/:id
 */
router.put("/:id", async function (req, res, next) {
  try {
    var id = Number(req.params.id);
    var updated = await containerService.updateContainer(id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/containers/:id/visibility
 */
router.patch("/:id/visibility", async function (req, res, next) {
  try {
    var id = Number(req.params.id);
    var isVisible = !!req.body.is_visible;
    var updated = await containerService.setVisibility(id, isVisible);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/containers/:id
 */
router.delete("/:id", async function (req, res, next) {
  try {
    var id = Number(req.params.id);
    await containerService.deleteContainer(id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
