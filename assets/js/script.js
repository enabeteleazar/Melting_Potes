document.addEventListener('DOMContentLoaded', () => {
  fetch('/assets/data/data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
      }
      return response.json();
    })
    .then(data => {
      const boutonZone = document.getElementById('boutons-menus');
      const container = document.getElementById('contenu-menu');

      if (!boutonZone || !container) {
        console.error("⚠️ Conteneurs #boutons-menus ou #contenu-menu introuvables");
        return;
      }

      // Créer un bouton pour chaque menu
      data.menus.forEach(menu => {
        const btn = document.createElement('button');
        btn.textContent = menu.titre;
        btn.style.marginRight = '10px';
        btn.onclick = () => afficherMenu(menu, container);
        boutonZone.appendChild(btn);
      });

      // Afficher le premier menu par défaut
      afficherMenu(data.menus[0], container);
    })
    .catch(err => {
      console.error('❌ Erreur de chargement JSON :', err);
    });
});

// Fonction d'affichage d’un menu
function afficherMenu(menu, container) {
  container.innerHTML = ''; // Vide le conteneur

  menu.categories.forEach(categorie => {
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
}
