/**
 * Projet      : Club Website
 * Fichier     : src/repositories/container.repository.js
 * Auteur      : Freezer64
 * Code        : CW-DB-CTN-001
 * Description : Accès aux données pour la table containers.
 * Créé le     : 2025-12-11T02:15:00Z
 */

var db = require("./db");

/**
 * Récupère tous les containers triés par position ASC.
 */
async function findAll() {
  var sql = "SELECT * FROM containers ORDER BY position ASC, id ASC";
  return db.query(sql);
}

/**
 * Récupère un container par son id.
 */
async function findById(id) {
  var sql = "SELECT * FROM containers WHERE id = ? LIMIT 1";
  var rows = await db.query(sql, [id]);
  return rows[0] || null;
}

/**
 * Récupère un container par son slug.
 */
async function findBySlug(slug) {
  var sql = "SELECT * FROM containers WHERE slug = ? LIMIT 1";
  var rows = await db.query(sql, [slug]);
  return rows[0] || null;
}

/**
 * Crée un nouveau container.
 */
async function create(data) {
  var sql = `
    INSERT INTO containers (title, slug, description, position, is_visible, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  var params = [
    data.title,
    data.slug,
    data.description || null,
    data.position || 0,
    data.is_visible ? 1 : 0,
    data.created_by || null
  ];

  var result = await db.query(sql, params);
  return findById(result.insertId);
}

/**
 * Met à jour un container existant.
 */
async function update(id, data) {
  var sql = `
    UPDATE containers
    SET title = ?, slug = ?, description = ?, position = ?, is_visible = ?
    WHERE id = ?
  `;

  var params = [
    data.title,
    data.slug,
    data.description || null,
    data.position || 0,
    data.is_visible ? 1 : 0,
    id
  ];

  await db.query(sql, params);
  return findById(id);
}

/**
 * Met à jour uniquement la visibilité.
 */
async function updateVisibility(id, isVisible) {
  var sql = "UPDATE containers SET is_visible = ? WHERE id = ?";
  await db.query(sql, [isVisible ? 1 : 0, id]);
  return findById(id);
}

/**
 * Supprime un container.
 * Les cards liées sont supprimées via ON DELETE CASCADE.
 */
async function remove(id) {
  var sql = "DELETE FROM containers WHERE id = ?";
  await db.query(sql, [id]);
  return true;
}

module.exports = {
  findAll: findAll,
  findById: findById,
  findBySlug: findBySlug,
  create: create,
  update: update,
  updateVisibility: updateVisibility,
  remove: remove
};
