/**
 * Projet      : Club Website
 * Fichier     : src/services/auth.service.js
 * Auteur      : Freezer64
 * Code        : CW-SVC-AUTH-001
 * Description : Gestion de l'authentification admin (login, hash, création).
 * Créé le     : 2025-12-11T00:25:00Z
 */

var bcrypt = require("bcrypt");
var userRepo = require("../repositories/user.repository");
var logger = require("../utils/logger");

var SALT_ROUNDS = 10;

/**
 * Hache un mot de passe utilisateur.
 */
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Vérifie un mot de passe par rapport au hash stocké.
 */
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/**
 * Crée un administrateur initial.
 * ⚠️ à exécuter une seule fois ou manuellement via une future interface.
 */
async function createAdmin(email, password) {
  var hashed = await hashPassword(password);

  var admin = await userRepo.createUser({
    email: email,
    password_hash: hashed,
    role: "ADMIN",
    is_active: 1
  });

  logger.info("👑 Administrateur créé avec succès", { adminId: admin.id });
  return admin;
}

/**
 * Tentative de connexion.
 */
async function login(email, password) {
  var user = await userRepo.findByEmail(email);

  if (!user) {
    return null;
  }

  var valid = await verifyPassword(password, user.password_hash);

  if (!valid) {
    return null;
  }

  return user;
}

module.exports = {
  hashPassword: hashPassword,
  verifyPassword: verifyPassword,
  createAdmin: createAdmin,
  login: login
};
