// src/public/admin-dashboard.js
// CW-FRONT-ADM-001 - Logique front du dashboard admin (déconnexion, etc.)

document.addEventListener("DOMContentLoaded", function () {
  var btnLogoutMain = document.getElementById("btn-logout-main");
  var btnLogoutSidebar = document.getElementById("btn-logout-sidebar");

  function handleLogoutClick(e) {
    e.preventDefault();

    fetch("/admin/auth/logout")
      .then(function (res) { return res.json(); })
      .then(function () {
        // Après déconnexion, on retourne vers la page de login admin
        window.location.href = "/admin/auth/login";
      })
      .catch(function () {
        // En cas d'erreur réseau, on tente quand même la redirection
        window.location.href = "/admin/auth/login";
      });
  }

  if (btnLogoutMain) {
    btnLogoutMain.addEventListener("click", handleLogoutClick);
  }

  if (btnLogoutSidebar) {
    btnLogoutSidebar.addEventListener("click", handleLogoutClick);
  }
});
