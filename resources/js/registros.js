import { consultarADD } from "/resources/js/registrosEspecificos";
import { cargarComposteras, consulta, generarComposteras } from "/resources/js/composteras";
import { cargarBolos } from "/resources/js/bolos";

let datos = []; // Array para almacenar los datos de la API
let paginaActual = 1; // Página inicial
const contenedor = document.querySelector("#Datos");
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");
const spanPaginaActual = document.querySelector("#paginaActual");
const registros = document.querySelector("#Registros");
const composteras = document.querySelector("#Composteras");
const bolos = document.querySelector("#Bolos");

cargarComposteras();


registros.addEventListener("click",()=> cargarDatos(paginaActual));
composteras.addEventListener("click",() => generarComposteras());
bolos.addEventListener("click", () => cargarBolos(paginaActual));



// Función para cargar datos de una página específica
async function cargarDatos(pagina) {
    try {
        const url = `/api/registros?page=${pagina}&per_page=20`;
        const registros = await consulta(url);
        console.log(registros.meta);
        // Limpiar y actualizar los datos
        datos = [];
        registros.data.forEach(registro => {
            datos.push({
                id: registro.id,
                user_id: registro.user_id,
                compostera_id: registro.compostera_id,
                ciclo_id: registro.ciclo_id
            });
        });

        //Actualizar la tabla con los nuevos datos
        generarTabla();

        // Actualizar botones de paginación y número de página
        manejarBotones(registros.meta);
    } catch (error) {
        console.error("Error al cargar datos:", error.message);
    }
}

// Función para generar la tabla en el DOM
function generarTabla() {
    // Limpiar el contenedor
    contenedor.innerHTML = "";
    btnAnterior.classList.remove("hidden");
    btnSiguiente.classList.remove("hidden");
    spanPaginaActual.classList.remove("hidden");

    // Crear un contenedor para hacer la tabla responsive
    const tablaWrapper = document.createElement("div");
    tablaWrapper.className = "overflow-x-auto mt-8 px-4"; // Márgenes laterales y superior

    // Crear un fragmento para construir la tabla
    const fragmento = document.createDocumentFragment();

    // Crear la tabla
    const tabla = document.createElement("table");
    tabla.className = "w-full border-collapse border border-gray-300 rounded-lg shadow-lg"; // Bordes redondeados y sombra

    // Crear y agregar cabeceras a la tabla
    const cabecera = document.createElement("thead");
    const filaCabecera = document.createElement("tr");
    filaCabecera.className = "bg-green-500 text-white font-bold"; // Fondo verde claro y texto blanco

    const cabeceras = ["ID Registro", "Username", "Tipo Compostera", "Ciclo"];
    cabeceras.forEach((texto) => {
        const th = document.createElement("th");
        th.className = "border border-gray-300 px-4 py-2 text-center"; // Centramos cabeceras
        th.textContent = texto;
        filaCabecera.appendChild(th);
    });
    cabecera.appendChild(filaCabecera);
    tabla.appendChild(cabecera);

    // Crear cuerpo de la tabla
    const cuerpo = document.createElement("tbody");
    datos.forEach((dato) => {
        const fila = document.createElement("tr");

        const celdaId = document.createElement("td");
        celdaId.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        const enlace = document.createElement("a");
        enlace.id = dato.id;
        enlace.href = "#";
        enlace.textContent = dato.id;
        enlace.className = "text-blue-600 hover:underline";
        enlace.addEventListener("click", consultarADD);
        celdaId.appendChild(enlace);
        fila.appendChild(celdaId);

        const celdaUserId = document.createElement("td");
        celdaUserId.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        celdaUserId.textContent = dato.user_id;
        fila.appendChild(celdaUserId);

        const celdaComposteraId = document.createElement("td");
        celdaComposteraId.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        celdaComposteraId.textContent =
            dato.compostera_id === 1
                ? "Aporte"
                : dato.compostera_id === 2
                ? "Degradación"
                : "Maduración";
        fila.appendChild(celdaComposteraId);

        const celdaCicloId = document.createElement("td");
        celdaCicloId.className = "border border-gray-300 px-4 py-2 text-center align-middle"; // Centramos celdas
        celdaCicloId.textContent = dato.ciclo_id;
        fila.appendChild(celdaCicloId);

        cuerpo.appendChild(fila);
    });

    // Agregar el cuerpo a la tabla
    tabla.appendChild(cuerpo);

    // Envolver la tabla en el contenedor responsivo
    tablaWrapper.appendChild(tabla);

    // Agregar el contenedor responsivo al fragmento
    fragmento.appendChild(tablaWrapper);

    // Agregar el fragmento al contenedor
    contenedor.appendChild(fragmento);
}








// Función para manejar los botones "Siguiente" y "Anterior"
export function manejarBotones(meta) {
    btnAnterior.disabled = meta.current_page === 1; // Deshabilitar si está en la primera página
    btnSiguiente.disabled = meta.current_page === meta.last_page; // Deshabilitar si está en la última página
    spanPaginaActual.textContent = meta.current_page; // Actualizar número de página
}

// Eventos de los botones
btnAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        cargarDatos(paginaActual);
    }
});

btnSiguiente.addEventListener("click", () => {
    paginaActual++;
    cargarDatos(paginaActual);
});





export{cargarDatos,generarTabla};