document.addEventListener('DOMContentLoaded', () => {
  fetch('/assets/data/data.json') // ← CORRECT avec ton arborescence
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('plats');
      if (!container) {
        console.error("⚠️ Élément #plats introuvable");
        return;
      }

      const menuPlats = data.menus.find(menu => menu.id === 'menu1');
      if (!menuPlats) {
        container.innerHTML = '<p>Menu "Plats" non trouvé.</p>';
        return;
      }

      container.innerHTML = ''; // Vide le conteneur

      menuPlats.categories.forEach(categorie => {
        const catTitle = document.createElement('h4');
        catTitle.textContent = categorie.nom;
        container.appendChild(catTitle);

        categorie.items.forEach(item => {
          const div = document.createElement('div');
          div.classList.add('plats');
          div.innerHTML = `
            <h5>${item.nom}</h5>
            <p>${item.prix.toFixed(2)} €</p>
            ${item.options ? `<small>${item.options}</small>` : ''}
          `;
          container.appendChild(div);
        });
      });
    })
    .catch(err => {
      console.error('❌ Erreur de chargement JSON :', err);
    });
});
