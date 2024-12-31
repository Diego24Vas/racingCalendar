document.addEventListener('DOMContentLoaded', function() {
    fetch('../html/filtro.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-filtro').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el filtro:', error));
});


