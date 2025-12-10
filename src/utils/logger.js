/**
 * Logger simple et propre.
 */

function log(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  let safeMeta = "{}";

  try {
    safeMeta = JSON.stringify(meta);
  } catch {}

  // Pas de backticks → zéro problème sous Windows
  console.log("[" + timestamp + "] [" + level.toUpperCase() + "]", message, safeMeta);
}

module.exports = {
  debug: function (msg, meta) { log("debug", msg, meta); },
  info: function (msg, meta) { log("info", msg, meta); },
  warn: function (msg, meta) { log("warn", msg, meta); },
  error: function (msg, meta) { log("error", msg, meta); },
};
