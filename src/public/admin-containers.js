// src/public/admin-containers.js
// CW-FRONT-ADM-CTN-001 - Gestion des containers en mode cartes côté admin.

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("containersGrid");
  var form = document.getElementById("containerForm");
  var msg = document.getElementById("formMsg");

  // -----------------------------
  // Chargement de la liste
  // -----------------------------
  async function loadContainers() {
    grid.innerHTML = "<div class='empty'>Chargement des containers...</div>";

    try {
      var res = await fetch("/api/containers");
      var data = await res.json();

      if (!data.success) {
        grid.innerHTML = "<div class='empty'>Erreur de chargement.</div>";
        return;
      }

      var list = data.data || [];

      if (list.length === 0) {
        grid.innerHTML = "<div class='empty'>Aucun container pour l'instant. Crée le premier à droite.</div>";
        return;
      }

      grid.innerHTML = "";
      list.forEach(function (ctn) {
        grid.appendChild(renderCard(ctn));
      });
    } catch (e) {
      grid.innerHTML = "<div class='empty'>Erreur réseau.</div>";
    }
  }

  // -----------------------------
  // Rendu d'une carte container
  // -----------------------------
  function renderCard(ctn) {
    var card = document.createElement("article");
    card.className = "card";

    var header = document.createElement("div");
    header.className = "card-header";

    var titleBox = document.createElement("div");
    var title = document.createElement("div");
    title.className = "card-title";
    title.textContent = ctn.title;

    var sub = document.createElement("div");
    sub.className = "card-sub";
    sub.textContent = "Slug : " + ctn.slug;

    titleBox.appendChild(title);
    titleBox.appendChild(sub);

    var badge = document.createElement("span");
    badge.className = "badge" + (ctn.is_visible ? "" : " off");
    badge.textContent = ctn.is_visible ? "Visible" : "Masqué";
    badge.title = "Cliquer pour basculer la visibilité";
    badge.addEventListener("click", function () {
      toggleVisibility(ctn.id, !ctn.is_visible);
    });

    header.appendChild(titleBox);
    header.appendChild(badge);

    var desc = document.createElement("div");
    desc.className = "card-sub";
    desc.style.marginTop = "0.35rem";
    desc.textContent = ctn.description || "Aucune description fournie.";

    var footer = document.createElement("div");
    footer.className = "card-footer";

    var meta = document.createElement("div");
    meta.textContent = "Position : " + ctn.position;

    var actions = document.createElement("div");
    actions.className = "btn-row";

    // Bouton supprimer
    var btnDelete = document.createElement("button");
    btnDelete.className = "btn small danger";
    btnDelete.textContent = "Supprimer";
    btnDelete.addEventListener("click", function () {
      if (confirm("Supprimer ce container ?")) {
        deleteContainer(ctn.id);
      }
    });

    actions.appendChild(btnDelete);

    footer.appendChild(meta);
    footer.appendChild(actions);

    card.appendChild(header);
    card.appendChild(desc);
    card.appendChild(footer);

    return card;
  }

  // -----------------------------
  // Toggle visibilité
  // -----------------------------
  async function toggleVisibility(id, isVisible) {
    try {
      await fetch("/api/containers/" + id + "/visibility", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_visible: isVisible })
      });
      loadContainers();
    } catch (e) {
      alert("Erreur lors de la mise à jour de la visibilité.");
    }
  }

  // -----------------------------
  // Suppression
  // -----------------------------
  async function deleteContainer(id) {
    try {
      var res = await fetch("/api/containers/" + id, {
        method: "DELETE"
      });
      var data = await res.json();
      if (data.success) {
        loadContainers();
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (e) {
      alert("Erreur réseau lors de la suppression.");
    }
  }

  // -----------------------------
  // Création
  // -----------------------------
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    msg.textContent = "Création en cours...";

    var payload = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      position: document.getElementById("position").value,
      is_visible: document.getElementById("is_visible").value === "1"
    };

    try {
      var res = await fetch("/api/containers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      var data = await res.json();

      if (data.success) {
        msg.textContent = "✅ Container créé.";
        form.reset();
        document.getElementById("position").value = "0";
        loadContainers();
      } else {
        msg.textContent = "❌ " + (data.message || "Erreur de création.");
      }
    } catch (e) {
      msg.textContent = "💥 Erreur réseau.";
    }
  });

  // Chargement initial
  loadContainers();
});
