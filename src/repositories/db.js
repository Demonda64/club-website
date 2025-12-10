/**
 * Connexion MySQL centralisée.
 * Utilise mysql2/promise + pool de connexions.
 * Les paramètres viennent de config/default.js qui lit .env
 */

const mysql = require("mysql2/promise");
const config = require("../../config/default");
const logger = require("../utils/logger");

let pool;

/**
 * Initialise le pool de connexions MySQL (singleton).
 */
async function initDB() {
  if (pool) return pool;

  try {
    pool = mysql.createPool({
      host: config.db.host,
      user: config.db.user,
      password: config.db.pass,
      database: config.db.name,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test de connexion
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    logger.info("Connexion MySQL établie avec succès.");
  } catch (err) {
    logger.error("Erreur lors de la connexion MySQL", { message: err.message });
    throw err;
  }

  return pool;
}

/**
 * Exécute une requête SQL de manière sécurisée
 * en utilisant des paramètres (évite les injections SQL).
 */
async function query(sql, params = []) {
  if (!pool) {
    await initDB();
  }

  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = {
  initDB,
  query,
};
