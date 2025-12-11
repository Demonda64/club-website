/**
 * Projet      : Club Website
 * Fichier     : src/services/container.service.js
 * Auteur      : Freezer64
 * Code        : CW-SVC-CTN-001
 * Description : Logique métier pour les containers (validation, slug, etc.).
 * Créé le     : 2025-12-11T02:20:00Z
 */

var containerRepo = require("../repositories/container.repository");
var logger = require("../utils/logger");

/**
 * Transforme une chaîne en slug simple.
 */
function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Valide les données d'un container.
 */
function validatePayload(payload, isUpdate) {
  var errors = [];

  if (!payload.title || String(payload.title).trim().length < 3) {
    errors.push("Le titre doit contenir au moins 3 caractères.");
  }

  if (payload.position != null && Number.isNaN(Number(payload.position))) {
    errors.push("La position doit être un nombre.");
  }

  if (errors.length > 0) {
    var err = new Error(errors.join(" "));
    err.status = 400;
    throw err;
  }
}

/**
 * Liste tous les containers.
 */
async function listContainers() {
  return containerRepo.findAll();
}

/**
 * Crée un container avec validation + slug unique.
 */
async function createContainer(payload, userId) {
  validatePayload(payload, false);

  var slug = payload.slug ? slugify(payload.slug) : slugify(payload.title);

  // Slug unique
  var existing = await containerRepo.findBySlug(slug);
  if (existing) {
    slug = slug + "-" + Date.now();
  }

  var toCreate = {
    title: String(payload.title).trim(),
    slug: slug,
    description: payload.description || null,
    position: payload.position ? Number(payload.position) : 0,
    is_visible: payload.is_visible !== undefined ? !!payload.is_visible : true,
    created_by: userId || null
  };

  var created = await containerRepo.create(toCreate);

  logger.info("🧱 Container créé", { id: created.id, title: created.title });

  return created;
}

/**
 * Met à jour un container.
 */
async function updateContainer(id, payload) {
  validatePayload(payload, true);

  var existing = await containerRepo.findById(id);
  if (!existing) {
    var notFound = new Error("Container introuvable.");
    notFound.status = 404;
    throw notFound;
  }

  var slug = payload.slug
    ? slugify(payload.slug)
    : existing.slug || slugify(payload.title || existing.title);

  var other = await containerRepo.findBySlug(slug);
  if (other && other.id !== existing.id) {
    slug = slug + "-" + Date.now();
  }

  var toUpdate = {
    title: payload.title ? String(payload.title).trim() : existing.title,
    slug: slug,
    description:
      payload.description !== undefined ? payload.description : existing.description,
    position:
      payload.position != null ? Number(payload.position) : existing.position,
    is_visible:
      payload.is_visible != null ? !!payload.is_visible : !!existing.is_visible
  };

  var updated = await containerRepo.update(id, toUpdate);

  logger.info("🧱 Container mis à jour", { id: updated.id, title: updated.title });

  return updated;
}

/**
 * Modifie uniquement la visibilité.
 */
async function setVisibility(id, isVisible) {
  var existing = await containerRepo.findById(id);
  if (!existing) {
    var notFound = new Error("Container introuvable.");
    notFound.status = 404;
    throw notFound;
  }

  var updated = await containerRepo.updateVisibility(id, isVisible);

  logger.info("👁️ Visibilité container mise à jour", {
    id: updated.id,
    is_visible: updated.is_visible
  });

  return updated;
}

/**
 * Supprime un container.
 */
async function deleteContainer(id) {
  var existing = await containerRepo.findById(id);
  if (!existing) {
    var notFound = new Error("Container introuvable.");
    notFound.status = 404;
    throw notFound;
  }

  await containerRepo.remove(id);

  logger.warn("🧨 Container supprimé", { id: id, title: existing.title });

  return true;
}

module.exports = {
  listContainers: listContainers,
  createContainer: createContainer,
  updateContainer: updateContainer,
  setVisibility: setVisibility,
  deleteContainer: deleteContainer
};
