function includeHTML() {
  document.querySelectorAll('[data-include]').forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => {
        if (res.ok) return res.text();
        throw new Error('404 not found');
      })
      .then(data => {
        el.innerHTML = data;
        includeHTML(); // pour charger récursivement
      })
      .catch(err => console.error(err));
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
