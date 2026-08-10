// ==========================================
// CONFIGURACIÓN
// ==========================================

const svg = d3.select("#map");

const width = 900;
const height = 900;


// ==========================================
// PROYECCIÓN
// ==========================================

// Proyección geográfica
const projection = d3.geoNaturalEarth1()
    .center([-60, -20])
    .scale(650)
    .translate([width / 2, height / 2]);


// Generador de paths SVG
const path = d3.geoPath()
    .projection(projection);


// ==========================================
// CARGAR GEOJSON
// ==========================================

d3.json("data/south-america.geojson")
    .then(data => {

        console.log("GeoJSON cargado:", data);

        crearMapa(data);

    })
    .catch(error => {

        console.error("No se pudo cargar el GeoJSON:", error);

    });


// ==========================================
// CREAR MAPA
// ==========================================

function crearMapa(data) {

    const countries = data.features;

    // --------------------------------------
    // CREAR LOS PAÍSES
    // --------------------------------------

    const countryPaths = svg
        .selectAll(".country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country")
        .attr("d", path);


    // --------------------------------------
    // PREPARAR ANIMACIÓN
    // --------------------------------------

    countryPaths.each(function(d, i) {

        const element = this;

        const length = element.getTotalLength();

        element.style.setProperty(
            "--length",
            length
        );

        element.style.strokeDasharray = length;

        element.style.strokeDashoffset = length;

        // ----------------------------------
        // ANIMACIÓN SECUENCIAL
        // ----------------------------------

        element.style.animationDelay =
            `${i * 0.08}s`;

        element.classList.add("draw");

    });

}