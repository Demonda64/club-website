// CW-FRONT-AUTH-001 - Script de login admin sécurisé

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    msg.textContent = "Connexion en cours...";

    try {
      const res = await fetch("/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        })
      });

      const data = await res.json();

      if (data.success) {
        msg.textContent = "✅ Connecté !";
        window.location.href = "/admin/auth/profile";
      } else {
        msg.textContent = "❌ " + (data.message || "Erreur de connexion");
      }
    } catch (err) {
      msg.textContent = "💥 Erreur réseau";
    }
  });
});
