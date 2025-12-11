/**
 * Projet      : Club Website
 * Fichier     : src/utils/logger.js
 * Auteur      : Freezer64
 * Code        : CW-LOG-001
 * Description : Logger centralisé avec emojis et métadonnées.
 * Créé le     : 2025-12-10T23:05:00Z
 */

var AUTHOR_TAG = "Freezer64";

/**
 * Retourne un timestamp ISO standard.
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * Associe un emoji à chaque niveau de log.
 */
function getEmojiForLevel(level) {
  if (level === "debug") return "🔍";
  if (level === "info")  return "ℹ️";
  if (level === "warn")  return "⚠️";
  if (level === "error") return "❌";
  return "📌";
}

/**
 * Fonction interne de log.
 */
function log(level, message, meta) {
  if (!meta) {
    meta = {};
  }

  var timestamp = getTimestamp();
  var emoji = getEmojiForLevel(level);
  var safeMeta = "{}";

  try {
    safeMeta = JSON.stringify(meta);
  } catch (e) {
    safeMeta = '{"error":"meta non sérialisable"}';
  }

  var header =
    "[" + timestamp + "] " +
    "[" + level.toUpperCase() + "] " +
    emoji + " " +
    "[" + AUTHOR_TAG + "]";

  console.log(header, message, safeMeta);
}

module.exports = {
  debug: function (msg, meta) { log("debug", msg, meta); },
  info:  function (msg, meta) { log("info",  msg, meta); },
  warn:  function (msg, meta) { log("warn",  msg, meta); },
  error: function (msg, meta) { log("error", msg, meta); }
};
