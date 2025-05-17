function includeHTML() {
    document.querySelectorAll('[data-include]').forEach(el => {
        const file = el.getAttribute('data-include');
        fetch(file)
        .then(res.text())
        .then(data => {
            el.innerHTML = data;
        })
        .catch(err => {
            el.innerHTML = "<!-- Erreur de chargement : " + file + " -->";
            consolee.error("Erruer inclusion HTML :", err);
        });
    });
}

document.addEventListener("DOMContentLoaded", includeHTML);