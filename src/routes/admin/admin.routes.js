/**
 * Projet      : Club Website
 * Fichier     : src/routes/admin/admin.routes.js
 * Auteur      : Freezer64
 * Code        : CW-API-ADM-001
 * Description : Routes pour l'administration du site (dashboard).
 * Créé le     : 2025-12-11T01:30:00Z
 */

var express = require("express");
var router = express.Router();
var authMiddleware = require("../../middlewares/auth.middleware");
var logger = require("../../utils/logger");

/**
 * GET /admin
 * Dashboard d'administration (protégé).
 */
router.get("/", authMiddleware.isAuthenticated, function (req, res) {
  var user = req.session.user || { email: "", role: "" };

  logger.info("📊 Accès au dashboard admin", {
    userId: user.id,
    email: user.email
  });

  var html = ""
    + "<!doctype html>"
    + "<html lang='fr'>"
    + "<head>"
    + "  <meta charset='utf-8' />"
    + "  <title>Dashboard admin - Club</title>"
    + "  <meta name='viewport' content='width=device-width, initial-scale=1' />"
    + "  <style>"
    + "    body { margin:0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#020617; color:#e5e7eb; }"
    + "    .layout { display:flex; min-height:100vh; }"
    + "    .sidebar { width:260px; background:#020617; border-right:1px solid #1f2937; padding:1.5rem 1.25rem; box-sizing:border-box; }"
    + "    .logo { font-weight:700; font-size:1.2rem; margin-bottom:1.5rem; display:flex; align-items:center; gap:0.4rem; }"
    + "    .logo span.icon { width:26px; height:26px; border-radius:999px; background:linear-gradient(135deg,#2563eb,#22c55e); display:flex; align-items:center; justify-content:center; font-size:0.9rem; }"
    + "    .nav-section-title { font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; color:#6b7280; margin-top:0.75rem; margin-bottom:0.25rem; }"
    + "    .nav { list-style:none; padding:0; margin:0; }"
    + "    .nav li { margin-top:0.25rem; }"
    + "    .nav a { display:flex; align-items:center; gap:0.6rem; padding:0.5rem 0.6rem; border-radius:0.5rem; color:#e5e7eb; text-decoration:none; font-size:0.9rem; }"
    + "    .nav a:hover { background:#111827; }"
    + "    .nav a span.icon { font-size:1.1rem; }"
    + "    .main { flex:1; padding:1.5rem 2rem; box-sizing:border-box; }"
    + "    .topbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }"
    + "    .top-title { font-size:1.2rem; font-weight:600; }"
    + "    .user-pill { display:flex; align-items:center; gap:0.5rem; background:#020617; border-radius:999px; padding:0.35rem 0.8rem; border:1px solid #1f2937; font-size:0.85rem; }"
    + "    .user-avatar { width:26px; height:26px; border-radius:999px; background:#1d4ed8; display:flex; align-items:center; justify-content:center; font-size:0.9rem; font-weight:600; }"
    + "    .tag { font-size:0.7rem; text-transform:uppercase; padding:0.15rem 0.4rem; border-radius:999px; border:1px solid #22c55e33; color:#22c55e; }"
    + "    .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem; margin-top:0.5rem; }"
    + "    .card { background:#020617; border-radius:0.9rem; padding:1rem; border:1px solid #1f2937; box-shadow:0 10px 30px rgba(0,0,0,0.4); }"
    + "    .card-title { font-size:0.95rem; font-weight:600; margin-bottom:0.35rem; }"
    + "    .card-desc { font-size:0.8rem; color:#9ca3af; margin-bottom:0.6rem; }"
    + "    .card-badge { font-size:0.75rem; color:#22c55e; }"
    + "    .btn-row { margin-top:1.2rem; display:flex; flex-wrap:wrap; gap:0.5rem; }"
    + "    .btn { font-size:0.85rem; padding:0.4rem 0.7rem; border-radius:0.5rem; border:1px solid #1d4ed8; background:#1d4ed8; color:white; cursor:pointer; }"
    + "    .btn.secondary { background:transparent; border-color:#4b5563; color:#e5e7eb; }"
    + "    .btn.danger { background:#b91c1c; border-color:#b91c1c; }"
    + "    .btn:hover { filter:brightness(1.08); }"
    + "    .muted { font-size:0.75rem; color:#6b7280; margin-top:1rem; }"
    + "  </style>"
    + "</head>"
    + "<body>"
    + "  <div class='layout'>"
    + "    <aside class='sidebar'>"
    + "      <div class='logo'>"
    + "        <span class='icon'>🏐</span>"
    + "        <span>Club Admin</span>"
    + "      </div>"
    + "      <div class='nav-section'>"
    + "        <div class='nav-section-title'>Navigation</div>"
    + "        <ul class='nav'>"
    + "          <li><a href='/admin'><span class='icon'>📊</span><span>Dashboard</span></a></li>"
    + "          <li><a href='/' target='_blank'><span class='icon'>🌐</span><span>Voir le site public</span></a></li>"
    + "        </ul>"
    + "      </div>"
    + "      <div class='nav-section'>"
    + "        <div class='nav-section-title'>Contenu</div>"
    + "        <ul class='nav'>"
    + "          <li><a href='#'><span class='icon'>🧱</span><span>Containers (bientôt)</span></a></li>"
    + "          <li><a href='#'><span class='icon'>🃏</span><span>Cards (bientôt)</span></a></li>"
    + "        </ul>"
    + "      </div>"
    + "      <div class='nav-section'>"
    + "        <div class='nav-section-title'>Compte</div>"
    + "        <ul class='nav'>"
    + "          <li><a href='/admin/auth/profile'><span class='icon'>👤</span><span>Profil JSON</span></a></li>"
    + "          <li><a href='#' id='btn-logout-sidebar'><span class='icon'>🚪</span><span>Se déconnecter</span></a></li>"
    + "        </ul>"
    + "      </div>"
    + "    </aside>"
    + "    <main class='main'>"
    + "      <div class='topbar'>"
    + "        <div class='top-title'>"
    + "          Panneau d'administration"
    + "        </div>"
    + "        <div class='user-pill'>"
    + "          <div class='user-avatar'>" + (user.email ? user.email.charAt(0).toUpperCase() : "A") + "</div>"
    + "          <div>"
    + "            <div style='font-size:0.8rem;'>" + user.email + "</div>"
    + "            <div class='tag'>" + user.role + "</div>"
    + "          </div>"
    + "        </div>"
    + "      </div>"
    + "      <section>"
    + "        <div class='cards'>"
    + "          <article class='card'>"
    + "            <div class='card-title'>📌 État de la connexion</div>"
    + "            <div class='card-desc'>Vous êtes connecté en tant qu'administrateur. Les futures fonctionnalités (containers, cards, membres...) seront gérées depuis ce tableau de bord.</div>"
    + "            <div class='card-badge'>Session active ✅</div>"
    + "          </article>"
    + "          <article class='card'>"
    + "            <div class='card-title'>🧱 Containers</div>"
    + "            <div class='card-desc'>Sections principales du site vitrine (hero, équipes, horaires, tarifs...). Vous pourrez bientôt les créer, réordonner et masquer.</div>"
    + "            <div class='btn-row'>"
    + "              <button class='btn secondary' disabled>Voir les containers</button>"
    + "              <button class='btn secondary' disabled>Ajouter un container</button>"
    + "            </div>"
    + "          </article>"
    + "          <article class='card'>"
    + "            <div class='card-title'>🃏 Cards</div>"
    + "            <div class='card-desc'>Contenu interne des sections (cartes d'information, actualités, coachs, événements...). Géré par container.</div>"
    + "            <div class='btn-row'>"
    + "              <button class='btn secondary' disabled>Gérer les cards</button>"
    + "            </div>"
    + "          </article>"
    + "          <article class='card'>"
    + "            <div class='card-title'>⚙️ Compte admin</div>"
    + "            <div class='card-desc'>Vous pourrez plus tard gérer plusieurs comptes administrateurs, changer votre mot de passe, etc.</div>"
    + "            <div class='btn-row'>"
    + "              <button class='btn danger' id='btn-logout-main'>Se déconnecter</button>"
    + "            </div>"
    + "          </article>"
    + "        </div>"
    + "        <p class='muted'>"
    + "          💡 Astuce : ce dashboard est 100% vanilla JS et prêt pour une migration future vers React (les blocs pourront devenir des composants)."
    + "        </p>"
    + "      </section>"
    + "    </main>"
    + "  </div>"
    + "  <script src='/admin-dashboard.js'></script>"
    + "</body>"
    + "</html>";

  res.send(html);
});



module.exports = router;
