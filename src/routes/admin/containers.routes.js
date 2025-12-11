/**
 * Projet      : Club Website
 * Fichier     : src/routes/admin/containers.routes.js
 * Auteur      : Freezer64
 * Code        : CW-API-ADM-CTN-001
 * Description : Page d'administration des containers (vue cartes).
 * Créé le     : 2025-12-11T08:00:00Z
 */

var express = require("express");
var router = express.Router();
var authMiddleware = require("../../middlewares/auth.middleware");

router.get("/", authMiddleware.isAuthenticated, function (req, res) {
  var html = ""
    + "<!doctype html>"
    + "<html lang='fr'>"
    + "<head>"
    + "  <meta charset='utf-8' />"
    + "  <title>Containers - Admin</title>"
    + "  <meta name='viewport' content='width=device-width, initial-scale=1' />"
    + "  <style>"
    + "    body { margin:0; font-family:system-ui,-apple-system,'Segoe UI',sans-serif; background:#020617; color:#e5e7eb; }"
    + "    .page { max-width:1100px; margin:0 auto; padding:1.5rem 1.25rem 2.5rem; }"
    + "    h1 { font-size:1.5rem; margin-bottom:0.5rem; }"
    + "    .muted { font-size:0.85rem; color:#9ca3af; margin-bottom:1rem; }"
    + "    a.link-back { font-size:0.8rem; color:#60a5fa; text-decoration:none; display:inline-flex; align-items:center; gap:0.25rem; margin-bottom:0.75rem; }"
    + "    .layout { display:grid; grid-template-columns:2fr 1fr; gap:1.5rem; align-items:flex-start; }"
    + "    @media (max-width:900px) { .layout { grid-template-columns:1fr; } }"
    + "    .cards-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1rem; }"
    + "    .card { background:#020617; border-radius:0.9rem; border:1px solid #1f2937; padding:0.9rem 0.9rem 0.8rem; box-shadow:0 10px 30px rgba(0,0,0,0.4); }"
    + "    .card-header { display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; margin-bottom:0.35rem; }"
    + "    .card-title { font-size:0.95rem; font-weight:600; }"
    + "    .card-sub { font-size:0.75rem; color:#9ca3af; }"
    + "    .badge { font-size:0.7rem; padding:0.12rem 0.45rem; border-radius:999px; border:1px solid #22c55e55; color:#22c55e; cursor:pointer; }"
    + "    .badge.off { border-color:#ef4444aa; color:#f97316; }"
    + "    .card-footer { display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; font-size:0.75rem; color:#6b7280; }"
    + "    .btn { font-size:0.8rem; padding:0.25rem 0.55rem; border-radius:0.4rem; border:1px solid #4b5563; background:#111827; color:#e5e7eb; cursor:pointer; }"
    + "    .btn.danger { border-color:#b91c1c; background:#7f1d1d; }"
    + "    .btn.small { font-size:0.75rem; padding:0.18rem 0.45rem; }"
    + "    .btn-row { display:flex; gap:0.4rem; }"
    + "    .empty { font-size:0.85rem; color:#9ca3af; padding:0.75rem 0; }"
    + "    .form-card { background:#020617; border-radius:0.9rem; border:1px solid #1f2937; padding:1rem; box-shadow:0 10px 30px rgba(0,0,0,0.4); }"
    + "    label { display:block; font-size:0.8rem; margin-top:0.5rem; margin-bottom:0.15rem; }"
    + "    input, textarea, select { width:100%; box-sizing:border-box; padding:0.45rem 0.55rem; border-radius:0.4rem; border:1px solid #374151; background:#020617; color:#e5e7eb; font-size:0.85rem; }"
    + "    textarea { min-height:80px; resize:vertical; }"
    + "    .form-row { display:flex; gap:0.5rem; }"
    + "    .form-row > div { flex:1; }"
    + "    .form-actions { margin-top:0.75rem; display:flex; justify-content:flex-end; gap:0.5rem; }"
    + "    .msg { margin-top:0.4rem; font-size:0.8rem; min-height:1.1em; }"
    + "  </style>"
    + "</head>"
    + "<body>"
    + "  <div class='page'>"
    + "    <a class='link-back' href='/admin'>← Retour au dashboard</a>"
    + "    <h1>Containers</h1>"
    + "    <p class='muted'>Gère ici les sections principales de ton site vitrine (hero, présentation du club, équipes, horaires, tarifs...).</p>"
    + "    <div class='layout'>"
    + "      <section>"
    + "        <div id='containersGrid' class='cards-grid'>"
    + "          <div class='empty'>Chargement des containers...</div>"
    + "        </div>"
    + "      </section>"
    + "      <aside>"
    + "        <div class='form-card'>"
    + "          <h2 style='font-size:1rem;margin:0 0 0.5rem;'>Nouveau container</h2>"
    + "          <form id='containerForm'>"
    + "            <label for='title'>Titre *</label>"
    + "            <input id='title' name='title' required />"
    + "            <label for='description'>Description</label>"
    + "            <textarea id='description' name='description'></textarea>"
    + "            <div class='form-row'>"
    + "              <div>"
    + "                <label for='position'>Position</label>"
    + "                <input id='position' name='position' type='number' value='0' />"
    + "              </div>"
    + "              <div>"
    + "                <label for='is_visible'>Visible ?</label>"
    + "                <select id='is_visible' name='is_visible'>"
    + "                  <option value='1'>Oui</option>"
    + "                  <option value='0'>Non</option>"
    + "                </select>"
    + "              </div>"
    + "            </div>"
    + "            <div class='form-actions'>"
    + "              <button type='submit' class='btn'>Créer</button>"
    + "            </div>"
    + "            <div id='formMsg' class='msg'></div>"
    + "          </form>"
    + "        </div>"
    + "      </aside>"
    + "    </div>"
    + "  </div>"
    + "  <script src='/admin-containers.js'></script>"
    + "</body>"
    + "</html>";

  res.send(html);
});

module.exports = router;
