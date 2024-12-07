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
        // Crear un fragmento para optimizar la manipulación del DOM
        const fragmento = document.createDocumentFragment();

        // Crear la tabla y configurarla
        const tabla = document.createElement("table");
        tabla.style.border = "1px solid black";
        tabla.style.width = "100%";
        tabla.style.borderCollapse = "collapse";
        tabla.style.marginBottom = "20px"; // Espaciado entre tablas

        // Crear y agregar cabecera
        const cabecera = document.createElement("thead");
        const filaCabecera = document.createElement("tr");
        cabeceraTexto.forEach((texto) => {
            const th = document.createElement("th");
            th.textContent = texto;
            th.style.border = "1px solid black";
            th.style.padding = "8px";
            th.style.backgroundColor = "#f0f0f0"; // Fondo claro para cabecera
            th.style.textAlign = "center"; // Centrar texto
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
                celda.style.border = "1px solid black";
                celda.style.padding = "8px";
                celda.style.textAlign = "center"; // Centrar texto

                if (clave === "id") {
                    // Crear un enlace interactivo para el ID
                    const enlace = document.createElement("a");
                    enlace.textContent = valor;
                    enlace.href = "#"; // Evitar navegación predeterminada
                    enlace.style.color = "blue";
                    enlace.style.textDecoration = "underline";

                    // Agregar evento al enlace
                    enlace.addEventListener("click", consultarADD);

                    celda.appendChild(enlace);
                } else {
                    celda.textContent = valor;
                }

                fila.appendChild(celda);
            });

            cuerpo.appendChild(fila);
        });
        tabla.appendChild(cuerpo);

        // Agregar la tabla al fragmento
        fragmento.appendChild(tabla);

        return fragmento;
    }

    // Función para crear un título antes de cada tabla
    function crearTitulo(texto) {
        const titulo = document.createElement("h3");
        titulo.textContent = texto;
        titulo.style.margin = "20px 0 10px";
        titulo.style.fontSize = "1.5rem";
        titulo.style.color = "#333";
        return titulo;
    }

    // Crear y agregar la tabla de registros
    contenedor.appendChild(crearTitulo("Registros del Ciclo"));
    const cabeceraRegistros = ["Registro ID", "User ID", "Compostera ID"];
    const datosRegistros = registros.map((registro) => ({
        id: registro.id,
        user_id: registro.user_id,
        compostera_id: registro.compostera_id,
    }));
    const tablaRegistros = crearTabla(datosRegistros, cabeceraRegistros);
    contenedor.appendChild(tablaRegistros);
}






export {consultarRegistrosCiclo, generarTablasRegistrosCiclo};
