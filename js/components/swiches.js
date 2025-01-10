
// Switches que se ocupa en la página de pilotos y escuderias en la sección de información
document.getElementById('filter').addEventListener('change', function() {

    // Si el switch está activado, se oculta la información de los pilotos y se muestra la de las escuderías
    if (this.checked) {
        document.getElementById('pilotos-info').style.display = 'none';
        document.getElementById('escuderias-info').style.display = 'block';
    
    // Si el switch está desactivado, se oculta la información de las escuderías y se muestra la de los pilotos
    } else {
        document.getElementById('pilotos-info').style.display = 'block';
        document.getElementById('escuderias-info').style.display = 'none';
    }
});