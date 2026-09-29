const ciudades = document.querySelectorAll(".ciudad");

const overlay = document.getElementById("ciudadOverlay");
const imagen = document.getElementById("ciudadImagen");
const titulo = document.getElementById("ciudadTitulo");
const texto = document.getElementById("ciudadTexto");


ciudades.forEach(function(ciudad) {

    ciudad.addEventListener("mouseenter", function() {

        const nombre = ciudad.querySelector("strong").textContent;


        if (nombre === "WEIMAR") {

            imagen.src = "imagenes/Bauhaus weimar.jpg";
            titulo.textContent = "WEIMAR";
            texto.textContent =
                "En 1919, Walter Gropius fundó la Bauhaus en Weimar, dando comienzo a una nueva forma de entender el arte y el diseño.";

        }


        if (nombre === "DESSAU") {

            imagen.src = "imagenes/dessau por fuera.jpeg";
            titulo.textContent = "DESSAU";
            texto.textContent =
                "En Dessau, la Bauhaus desarrolló gran parte de su identidad moderna y consolidó su vínculo entre arte, diseño y arquitectura.";

        }


        if (nombre === "BERLÍN") {

            imagen.src = "imagenes/berlin bauhaus.jpeg";
            titulo.textContent = "BERLÍN";
            texto.textContent =
                "En 1932, la Bauhaus se trasladó a Berlín. Allí funcionó hasta 1933, cuando la escuela cerró definitivamente.";

        }


        overlay.classList.add("activa");

    });


    ciudad.addEventListener("mouseleave", function() {

        overlay.classList.remove("activa");

    });

});
const tarjetas = document.querySelectorAll(".tarjeta-figura");

tarjetas.forEach(function(tarjeta) {
    tarjeta.addEventListener("click", function() {

        // Cierra las demás tarjetas
        tarjetas.forEach(function(otraTarjeta) {
            if (otraTarjeta !== tarjeta) {
                otraTarjeta.classList.remove("girada");
            }
        });

        // Abre o cierra la tarjeta seleccionada
        tarjeta.classList.toggle("girada");
    });
});
// FILTRO DE OBRAS

const botonesFiltro = document.querySelectorAll(".filtros-obras button");
const obras = document.querySelectorAll(".obra-card");

botonesFiltro.forEach(function(boton) {

    boton.addEventListener("click", function() {

        // Cambiar botón activo
        botonesFiltro.forEach(function(b) {
            b.classList.remove("filtro-activo");
        });

        boton.classList.add("filtro-activo");

        const filtro = boton.textContent.trim();

        obras.forEach(function(obra) {

            const categoria = obra.querySelector(".obra-categoria").textContent.trim();

            if (filtro === "TODAS" || categoria === filtro) {
                obra.style.display = "block";
            } else {
                obra.style.display = "none";
            }

        });

    });

});
// =========================================
// HISTORIA - LÍNEA DE TIEMPO
// =========================================

const puntosHistoria = document.querySelectorAll(".timeline-punto");

const historiaAnio = document.getElementById("historiaAnio");
const historiaTitulo = document.getElementById("historiaTitulo");
const historiaSubtitulo = document.getElementById("historiaSubtitulo");
const historiaDescripcion = document.getElementById("historiaDescripcion");
const historiaImagen = document.getElementById("historiaImagen");
const historiaCaption = document.getElementById("historiaCaption");


puntosHistoria.forEach(function(punto) {

    punto.addEventListener("mouseenter", function() {

        puntosHistoria.forEach(function(p) {
            p.classList.remove("activo");
        });

        punto.classList.add("activo");


        historiaAnio.textContent =
            punto.dataset.anio;

        historiaTitulo.textContent =
            punto.dataset.titulo;

        historiaSubtitulo.textContent =
            punto.dataset.subtitulo;

        historiaDescripcion.textContent =
            punto.dataset.texto;

        historiaImagen.src =
            punto.dataset.imagen;

        historiaImagen.dataset.imagenHover =
            punto.dataset.imagenHover || "";

        historiaCaption.textContent =
            punto.dataset.caption;

    });

});


// =========================================
// CAMBIO DE IMAGEN AL PASAR EL CURSOR
// =========================================

if (historiaImagen) {

    historiaImagen.addEventListener("mouseenter", function() {

        if (historiaImagen.dataset.imagenHover) {
            historiaImagen.src =
                historiaImagen.dataset.imagenHover;
        }

    });


    historiaImagen.addEventListener("mouseleave", function() {

        const puntoActivo =
            document.querySelector(".timeline-punto.activo");

        if (puntoActivo) {
            historiaImagen.src =
                puntoActivo.dataset.imagen;
        }

    });

}

// =========================================
// TALLERES
// =========================================

const talleres = document.querySelectorAll(".taller");

talleres.forEach(function(taller) {

    const boton = taller.querySelector(".taller-boton");

    boton.onclick = function() {

        if (taller.classList.contains("abierto")) {

            taller.classList.remove("abierto");
            boton.textContent = "+";

        } else {

            taller.classList.add("abierto");
            boton.textContent = "−";

        }

    };

});