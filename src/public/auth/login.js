// src/public/auth/login.js
// CW-FRONT-AUTH-001 - Script de login admin sécurisé

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("loginForm");
  var msg = document.getElementById("msg");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    msg.textContent = "Connexion en cours...";

    try {
      var res = await fetch("/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        })
      });

      var data = await res.json();

      if (data.success) {
        msg.textContent = "✅ Connecté ! Redirection...";
        // 👉 Redirection vers le dashboard admin
        window.location.href = "/admin";
      } else {
        msg.textContent = "❌ " + (data.message || "Erreur de connexion");
      }
    } catch (err) {
      msg.textContent = "💥 Erreur réseau";
    }
  });
});
