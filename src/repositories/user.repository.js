/**
 * Projet      : Club Website
 * Fichier     : src/repositories/user.repository.js
 * Auteur      : Freezer64
 * Code        : CW-DB-002
 * Description : Accès aux données pour la table users.
 * Créé le     : 2025-12-11T00:30:00Z
 */

var db = require("./db");

/**
 * Recherche un utilisateur via email.
 */
async function findByEmail(email) {
  var sql = "SELECT * FROM users WHERE email = ? LIMIT 1";
  var rows = await db.query(sql, [email]);
  return rows[0] || null;
}

/**
 * Crée un utilisateur (admin ou autre).
 */
async function createUser(data) {
  var sql = `
    INSERT INTO users (email, password_hash, role, is_active)
    VALUES (?, ?, ?, ?)
  `;

  var params = [
    data.email,
    data.password_hash,
    data.role || "USER",
    data.is_active || 1
  ];

  var result = await db.query(sql, params);
  data.id = result.insertId;

  return data;
}

/**
 * Renvoie tous les utilisateurs sans les mots de passe.
 */
async function findAllUsers() {
  var sql = "SELECT id, email, role, is_active, created_at FROM users";
  return db.query(sql);
}

module.exports = {
  findByEmail: findByEmail,
  findAllUsers: findAllUsers,
  createUser: createUser
};
