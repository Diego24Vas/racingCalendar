document.getElementById('filter').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('pilotos-info').style.display = 'none';
        document.getElementById('escuderias-info').style.display = 'block';
    } else {
        document.getElementById('pilotos-info').style.display = 'block';
        document.getElementById('escuderias-info').style.display = 'none';
    }
});