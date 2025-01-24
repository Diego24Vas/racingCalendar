function mostrarFechaActual() {
    const opciones = { 
      timeZone: "America/Santiago", 
      year: "numeric", 
      month: "long", 
      day: "numeric", 
      //hour: "2-digit", 
      //minute: "2-digit", 
      //second: "2-digit" 
    };
    const fechaChile = new Intl.DateTimeFormat("es-CL", opciones).format(new Date());
    document.getElementById("fecha").textContent = fechaChile;
  }


  
  // Mostrar la fecha al cargar la página
  mostrarFechaActual();

  // Actualizar la fecha cada segundo
  setInterval(mostrarFechaActual, 1000);