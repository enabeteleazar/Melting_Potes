function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => res.text())
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => {
        el.innerHTML = "<!-- erreur de chargement : " + file + " -->";
        console.error("Erreur inclusion HTML :", err);
      });
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
