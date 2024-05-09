
    document.addEventListener('DOMContentLoaded', function () {
      let multipleCardCarousel = document.querySelector("#carouselExampleControls");
  
      if (multipleCardCarousel) { // Verifica si se encontró el elemento del carrusel
        if (window.matchMedia("(min-width: 768px)").matches) {
          let carousel = new bootstrap.Carousel(multipleCardCarousel, {
            interval: false, // Desactiva el desplazamiento automático
            wrap: false // Evita que se rebobine al final
          });
  
          // Función para calcular el ancho total del carrusel
          let carouselWidth = multipleCardCarousel.scrollWidth;
  
          // Función para obtener el ancho de una tarjeta del carrusel
          let cardWidth = multipleCardCarousel.querySelector(".carousel-item").offsetWidth;
          let scrollPosition = 0;
  
          // Manejador del evento "click" para el botón "Siguiente"
          document.querySelector("#carouselExampleControls .carousel-control-next").addEventListener("click", function () {
            if (scrollPosition < carouselWidth - cardWidth * 4) {
              scrollPosition += cardWidth;
              multipleCardCarousel.querySelector(".carousel-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
            }
          });
  
          // Manejador del evento "click" para el botón "Anterior"
          document.querySelector("#carouselExampleControls .carousel-control-prev").addEventListener("click", function () {
            if (scrollPosition > 0) {
              scrollPosition -= cardWidth;
              multipleCardCarousel.querySelector(".carousel-inner").scroll({ left: scrollPosition, behavior: 'smooth' });
            }
          });
        } else {
          multipleCardCarousel.classList.add("slide"); // Agrega la clase "slide" en pantallas pequeñas
        }
      }
    });
