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

let datos_bolo;

console.log(token);

// Función para consultar datos desde la API
async function consulta(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
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
export async function generarComposteras(mensajeExito = null) {
    // Limpiar el contenedor
    contenedor.innerHTML = "";

    // Si se pasa el mensaje de éxito, mostrar el alert al principio
    if (mensajeExito) {
        const alerta = document.createElement("div");
        alerta.className =
            "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4";
        alerta.setAttribute("role", "alert");

        const texto = document.createElement("span");
        texto.className = "block sm:inline";
        texto.textContent = mensajeExito;

        const botonCerrar = document.createElement("button");
        botonCerrar.className =
            "absolute top-0 bottom-0 right-0 px-4 py-3 text-green-700";
        botonCerrar.innerHTML = "&times;"; // Símbolo de cerrar
        botonCerrar.addEventListener("click", () => {
            alerta.remove(); // Eliminar la alerta al hacer clic
        });

        alerta.appendChild(texto);
        alerta.appendChild(botonCerrar);
        contenedor.appendChild(alerta); // Agregar la alerta al contenedor
    }

    // Obtener los bolos filtrados
    const datos_bolos = await saberBolos();
    console.log(datos_bolos);
    const bolosCiclo1y2 = datos_bolos.filter((bolo) => {;
        return bolo.ciclo1 == true && bolo.ciclo2 == true;
    });
    console.log("eeeo",bolosCiclo1y2);
    const bolosSoloCiclo1 = datos_bolos.filter((bolo) => {
        return bolo.ciclo1 == true && bolo.ciclo2 != true && bolo.ciclo3 != true;
    });
    console.log("eeeeeeeo", bolosSoloCiclo1);

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

        // Deshabilitar el botón según las condiciones de los bolos
        console.log(bolosCiclo1y2);
        console.log("Longitud de bolo con ciclo 1 terminado: ", bolosCiclo1y2);
        if (compostera_id == 2 && bolosSoloCiclo1.length < 1) {
            boton.disabled = true;
            boton.classList.add("bg-gray-400", "cursor-not-allowed");
            boton.classList.remove("bg-green-500");
        }

        if (compostera_id === 3 && bolosCiclo1y2.length == 0) {
            boton.disabled = true;
            boton.classList.add("bg-gray-400", "cursor-not-allowed");
            boton.classList.remove("bg-green-500");;
        }

        boton.addEventListener("click", () => {
            if (compostera_id == 1) {
                if (estado) {
                    alert(
                        "La compostera ya está ocupada por un bolo, introduce un registro"
                    );
                    generarFormularioAntes(compostera_id);
                } else {
                    alert(
                        "La compostera está libre, tienes que crear un bolo y un ciclo para poder introducir un registro"
                    );
                    generarFormularioBolo(compostera_id);
                }
            } else if (compostera_id == 2) {
                if (estado) {
                    alert(
                        "La compostera ya está ocupada por un bolo, introduce un registro"
                    );
                    generarFormularioAntes(compostera_id);
                } else {
                    alert(
                        "La compostera está libre, añadiendo el bolo correspondiente"
                    );
                    generarFormularioAntes(compostera_id);
                }
            } else if (compostera_id == 3) {
                if (estado) {
                    alert(
                        "La compostera ya está ocupada por un bolo, introduce un registro"
                    );
                    generarFormularioAntes(compostera_id);
                } else {
                    alert(
                        "La compostera está libre, añadiendo el bolo correspondiente"
                    );
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


export async function saberBolos() {
    try {
        const url = `/api/bolo/sinterminar`;
        const registros = await consulta(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        // Limpiar y actualizar los datos
        const datos = registros.map((registro) => ({
            id: registro.id,
            terminado: registro.terminado,
            ciclo1: registro.ciclo1,
            ciclo2: registro.ciclo2,
            ciclo3: registro.ciclo3,
        }));
        return datos; // Devolver los datos procesados
    } catch (error) {
        console.error("Error al cargar datos:", error.message);
        return []; // Devuelve un array vacío en caso de error
    }
}

export async function cargarComposteras(mensajeExito = null) {
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
        if(mensajeExito){
            generarComposteras(mensajeExito);
        }
        else {
            generarComposteras();
        }
        
    } catch (error) {
        console.error("Error al cargar datos:", error.message);
    }
}


