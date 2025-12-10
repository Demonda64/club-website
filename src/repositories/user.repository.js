// src/repositories/user.repository.js

const db = require("./db");

/**
 * Récupère tous les utilisateurs
 * (juste pour tester la coconnexion BDD dans un premier temps).
 */
async function findAllUsers() {
  const sql = "SELECT id, email, role, is_active, created_at FROM users";
  return db.query(sql);
}

module.exports = {
  findAllUsers,
};
