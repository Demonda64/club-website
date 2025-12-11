/**
 * Projet      : Club Website
 * Fichier     : src/repositories/db.js
 * Auteur      : Freezer64
 * Code        : CW-DB-001
 * Description : Connexion MySQL centralisée (pool mysql2/promise).
 * Créé le     : 2025-12-10T23:45:00Z
 */

var mysql = require("mysql2/promise");
var config = require("../../config/default");
var logger = require("../utils/logger");

var pool = null;

/**
 * Initialise le pool de connexions MySQL (singleton).
 */
async function initDB() {
  if (pool) {
    return pool;
  }

  try {
    pool = mysql.createPool({
      host: config.db.host,
      user: config.db.user,
      password: config.db.pass,
      database: config.db.name,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    var connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    logger.info("✅ [CW-DB-001] Connexion MySQL établie avec succès");
  } catch (err) {
    logger.error("❌ [CW-DB-001] Erreur lors de la connexion MySQL", {
      message: err.message
    });
    throw err;
  }

  return pool;
}

/**
 * Exécute une requête SQL sécurisée avec paramètres.
 */
async function query(sql, params) {
  if (!params) {
    params = [];
  }

  if (!pool) {
    await initDB();
  }

  var result = await pool.execute(sql, params);
  var rows = result[0];
  return rows;
}

module.exports = {
  initDB: initDB,
  query: query
};
