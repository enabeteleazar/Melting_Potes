<script>
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('plats');
        data.plats.forEach(plat => {
            CSSContainerRule.innerHTML += '
            <div class="plat">
                <h3>${plat.nom}</h3>
                <p>${plat.prix.toFixed(2)} €</p>   
            </div>
            ';
        });
    })
</script>