import {
    generarFormularioBolo,
    generarFormularioAntes,
} from "/resources/js/formulario";

let datos = []; // Array para almacenar los datos de la API
const contenedor = document.querySelector("#Datos");
const token = sessionStorage.getItem("token");
let datosFormularioAntes = {};
let datosFormularioDespues = {};
let datosFormularioDurante = {};

let datos_bolo = {};

console.log(token);

// Función para consultar datos desde la API
async function consulta(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

// Función para cargar datos de una página específica
export function generarComposteras() {
    // Limpiar el contenedor
    contenedor.innerHTML = "";

    // Crear un fragmento para construir la tabla
    const fragmento = document.createDocumentFragment();

    // Crear y agregar las cards
    datos.forEach((dato) => {
        const card = document.createElement("div");
        card.className =
            "bg-white shadow-md rounded-lg p-4 border border-gray-300 w-60 flex justify-between items-center";

        const compostera_id = dato.id;
        const estado = dato.ocupada;

        const contenido = document.createElement("div");
        const tipo = document.createElement("h2");
        tipo.className = "text-xl font-bold mb-2";
        tipo.textContent = `Tipo: ${dato.tipo}`;
        card.appendChild(tipo);

        const estado_compostera = document.createElement("h2");
        estado_compostera.className = "text-lg font-bold mb-2";

        // Determinar el estado y asignar el texto
        if (dato.ocupada) {
            estado_compostera.textContent = "Estado: Ocupada";
        } else {
            estado_compostera.textContent = "Estado: Libre";
        }

        // Añadir el elemento al contenedor
        card.appendChild(estado_compostera);

        const centroId = document.createElement("p");
        centroId.className = "text-gray-700";
        centroId.textContent = `Centro ID: ${dato.centro_id}`;
        card.appendChild(centroId);

        const boton = document.createElement("button");
        boton.className = "bg-green-500 text-white px-4 py-2 rounded";
        boton.textContent = "Nuevo Registro";
        boton.addEventListener("click", () => {
            // verEstadoComposteras(compostera_id);
            if (estado) {
                alert(
                    "La compostera ya está ocupada por un bolo, introduce un registro"
                );
                generarFormularioAntes(compostera_id);
            } else {
                alert(
                    "La compostera está libre,tienes que crear un bolo y un ciclo para poder introducir un registro"
                );
                if (compostera_id == 1) {
                    generarFormularioBolo(compostera_id);

                } else {
                    generarFormularioAntes(compostera_id);
                }
            }
        });

        fragmento.appendChild(card);
        card.appendChild(contenido);
        card.appendChild(boton);

        fragmento.appendChild(card);
    });

    // Agregar el fragmento al contenedor
    contenedor.appendChild(fragmento);
}

async function cargarComposteras() {
    try {
        const url = `/api/composteras`;
        const registros = await consulta(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        // Limpiar y actualizar los datos
        datos = [];
        registros.data.forEach((registro) => {
            datos.push({
                id: registro.id,
                tipo: registro.tipo,
                centro_id: registro.centro_id,
                ocupada: registro.ocupada,
            });
        });
        // Actualizar la tabla con los nuevos datos
        generarComposteras();
    } catch (error) {
        console.error("Error al cargar datos:", error.message);
    }
}

// async function verEstadoComposteras(id){
//     try {
//         const url = `/api/centros/${id}/composteras`;
//         const registros = await consulta(url,{
//             method: 'GET',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         datos_compostera = {};
//         datos_compostera = registros.data.forEach(registro=>{
//             datos_compostera.push({
//                 id: registro.id,
//                 ocupada: registro.ocupada,
//             });
//         });
//     }
//     catch(error){
//         console.log("Error al cargar la compostera", error.message);
//     }
// }

export { cargarComposteras };
