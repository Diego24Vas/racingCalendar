let events = [];  // Almacenaremos todos los eventos de los archivos JSON

// Lista de archivos JSON que queremos cargar
const jsonFiles = [
    '../json/NASCAR.json',
    '../json/F1.json',
    '../json/F2.json',
    '../json/INDYCAR.json',
    '../json/24lemans.json',
    '../json/Fe.json',
];

// Cargar todos los archivos JSON y combinar los eventos
Promise.all(jsonFiles.map(file => fetch(file).then(response => response.json())))
  .then(dataArray => {
    // Combinar los eventos de todos los archivos JSON
    dataArray.forEach(data => {
      events = events.concat(data.carreras);  // Asumimos que cada JSON tiene la clave 'carreras'
    });
    const today = new Date();
    createCalendar(today.getFullYear(), today.getMonth());
  })
  .catch(error => {
    console.error('Error al cargar los archivos JSON:', error);
  });

