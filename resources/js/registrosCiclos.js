import { consultarADD } from "/resources/js/registrosEspecificos";

const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");
const spanPaginaActual = document.querySelector("#paginaActual");
const token = sessionStorage.getItem("token");


async function consulta(url) { // Reemplaza con tu token real

    const response = await fetch(url, {
        method: "GET", // O el método que necesites (por defecto es GET)
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json", // Opcional, si estás enviando o esperando JSON
        },
    });

    if (!response.ok) {
        if (response.status === 404) {
            return null; // Lugar no encontrado
        }
        throw new Error("Error en la consulta de la API.");
    }
    return await response.json();
}


// Función para consultar y generar las tablas
async function consultarRegistrosCiclo(e) {
    let datos;
    let id = e.target.textContent;

    // Consulta y filtra registros de 'antes'
    const registros = await consulta(`/api/ciclo/${id}/registros`);
    console.log(registros);
    datos = [];
        registros.data.forEach(registro => {
            datos.push({
                id: registro.id,
                user_id: registro.user_id,
                compostera_id: registro.compostera_id,
            });
        });
        console.log(datos);
    generarTablasRegistrosCiclo(datos)
}

// Función para generar las tablas en el DOM
function generarTablasRegistrosCiclo(registros) {
    // Seleccionamos el contenedor donde estarán las tablas
    btnAnterior.classList.add("hidden");
    btnSiguiente.classList.add("hidden");
    spanPaginaActual.classList.add("hidden");
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Función para crear una tabla
    function crearTabla(datos, cabeceraTexto) {
        // Crear un contenedor para hacer la tabla responsive
        const tablaWrapper = document.createElement("div");
        tablaWrapper.className = "overflow-x-auto mt-8 px-4"; // Márgenes laterales y superior añadidos

        // Crear la tabla y configurarla
        const tabla = document.createElement("table");
        tabla.className = "w-full border-collapse border border-gray-300";

        // Crear y agregar cabecera
        const cabecera = document.createElement("thead");
        const filaCabecera = document.createElement("tr");
        filaCabecera.className = "bg-green-500 text-white font-bold"; // Fondo verde claro y texto blanco
        cabeceraTexto.forEach((texto) => {
            const th = document.createElement("th");
            th.className = "border border-gray-300 px-4 py-2 text-center"; // Centramos cabeceras
            th.textContent = texto;
            filaCabecera.appendChild(th);
        });
        cabecera.appendChild(filaCabecera);
        tabla.appendChild(cabecera);

        // Crear y agregar cuerpo de la tabla
        const cuerpo = document.createElement("tbody");
        datos.forEach((dato) => {
            const fila = document.createElement("tr");

            Object.entries(dato).forEach(([clave, valor]) => {
                const celda = document.createElement("td");
                celda.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas

                if (clave === "id") {
                    // Crear un enlace interactivo para el ID
                    const enlace = document.createElement("a");
                    enlace.textContent = valor;
                    enlace.href = "#";
                    enlace.className = "text-blue-600 hover:underline";
                    enlace.addEventListener("click", consultarADD);

                    celda.appendChild(enlace);
                } else if (clave === "compostera_id") {
                    // Lógica para convertir el ID en tipo compostera
                    let tipoCompostera = "N/A";
                    if (valor === 1) tipoCompostera = "Aporte";
                    else if (valor === 2) tipoCompostera = "Degradación";
                    else if (valor === 3) tipoCompostera = "Maduración";

                    celda.textContent = tipoCompostera;
                } else {
                    celda.textContent = valor;
                }

                fila.appendChild(celda);
            });

            cuerpo.appendChild(fila);
        });
        tabla.appendChild(cuerpo);

        // Agregar la tabla al contenedor responsivo
        tablaWrapper.appendChild(tabla);

        return tablaWrapper;
    }

    // Función para crear un título antes de cada tabla
    function crearTitulo(texto) {
        const titulo = document.createElement("h3");
        titulo.textContent = texto;
        titulo.className = "text-lg font-bold text-gray-700 my-4"; // Estilo similar a Tailwind
        return titulo;
    }

    // Crear y agregar la tabla de registros
    contenedor.appendChild(crearTitulo("Registros del Ciclo"));
    const cabeceraRegistros = ["Registro ID", "User ID", "Tipo Compostera"];
    const datosRegistros = registros.map((registro) => ({
        id: registro.id,
        user_id: registro.user_id,
        compostera_id: registro.compostera_id, // Este se procesará en la lógica de la tabla
    }));
    const tablaRegistros = crearTabla(datosRegistros, cabeceraRegistros);
    contenedor.appendChild(tablaRegistros);
}







export {consultarRegistrosCiclo, generarTablasRegistrosCiclo};
