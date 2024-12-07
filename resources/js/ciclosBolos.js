import {consultarRegistrosCiclo, generarTablasRegistrosCiclo} from "/resources/js/registrosCiclos";

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
async function consultarCiclosBolo(e) {
    e.preventDefault();
    let ciclos = [];
    let id = e.target.textContent;

    // Consulta y filtra registros de 'antes'
    const registros = await consulta(`/api/bolos/${id}/ciclos`);
    console.log(registros);
    registros.data.forEach(registro => {
        ciclos.push({
            id: registro.id,
            fecha_inicio: registro.fecha_inicio,
            fecha_fin: registro.fecha_fin,
            terminado: registro.terminado,
            compostera_id: registro.compostera_id,
        });
    });
    generarTablasCiclos(ciclos)
}

// Función para generar las tablas en el DOM
function generarTablasCiclos(ciclos) {
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
            th.style.backgroundColor = "#28a745"; // Fondo verde
            th.style.color = "#ffffff"; // Letras blancas
            th.style.textAlign = "center"; // Centrar texto
            filaCabecera.appendChild(th);
        });
        cabecera.appendChild(filaCabecera);
        tabla.appendChild(cabecera);

        // Crear y agregar cuerpo de la tabla
        const cuerpo = document.createElement("tbody");
        datos.forEach((dato) => {
            const fila = document.createElement("tr");

            // Iterar por cada propiedad del objeto
            Object.entries(dato).forEach(([clave, valor]) => {
                const celda = document.createElement("td");
                celda.style.border = "1px solid black";
                celda.style.padding = "8px";
                celda.style.textAlign = "center"; // Centrar texto

                if (clave === "ciclo_id") {
                    // Crear enlace para el ID
                    const enlace = document.createElement("a");
                    enlace.textContent = valor;
                    enlace.href = "#"; // Evitar navegación predeterminada
                    enlace.style.color = "blue";
                    enlace.style.textDecoration = "underline";
                    // Agregar evento al enlace
                    enlace.addEventListener("click", consultarRegistrosCiclo);

                    celda.appendChild(enlace);
                } else {
                    celda.textContent = valor; // Para otros valores, solo texto
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

    // Crear y agregar la tabla de 'ciclos'
    contenedor.appendChild(crearTitulo("Ciclos"));
    const cabeceraCiclos = ["Ciclo ID", "Fecha Inicio", "Fecha Fin", "Terminado", "Compostera ID"];
    const datosCiclos = ciclos.map((registro) => ({
        ciclo_id: registro.id,
        fecha_inicio: registro.fecha_inicio,
        fecha_fin: registro.fecha_fin || "N/A", // Mostrar "N/A" si no hay fecha de fin
        terminado: registro.terminado ? "Sí" : "No",
        compostera_id: registro.compostera_id,
    }));
    const tablaCiclos = crearTabla(datosCiclos, cabeceraCiclos);
    contenedor.appendChild(tablaCiclos);
}






export {consultarCiclosBolo, generarTablasCiclos};
