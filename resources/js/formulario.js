import { cargarComposteras } from "/resources/js/composteras";

const token = sessionStorage.getItem("token");
const paginacion = document.querySelector('#paginacion');
let datosBolo ={};
let datosCiclo ={};
let datosFormularioRegistro = {}; // Objeto para almacenar los datos del primer formulario
let datosFormularioAntes = {};
let datosFormularioDespues = {};
let datosFormularioDurante = {};
let compostera_id ;
const contenedor = document.querySelector("#Datos");
const user_id = sessionStorage.getItem('idUsuario');

export function generarFormularioBolo(compostera_seleccionada){
    compostera_id = compostera_seleccionada;
    if (compostera_id == 1) {
        
        console.log(compostera_id);
        contenedor.innerHTML = "";
        const labelNombreBolo = document.createElement("label");
        labelNombreBolo.textContent = "Nombre del bolo:";
        labelNombreBolo.classList.add(
            "block",
            "text-gray-700",
            "text-sm",
            "font-bold",
            "mb-2"
        );
        contenedor.appendChild(labelNombreBolo);

        const inputNombreBolo = document.createElement("input");
        inputNombreBolo.type = "text";
        inputNombreBolo.placeholder = "Nombre del bolo";
        inputNombreBolo.classList.add(
            "shadow",
            "appearance-none",
            "border",
            "rounded",
            "w-full",
            "py-2",
            "px-3",
            "text-gray-700",
            "leading-tight",
            "focus:outline-none",
            "focus:shadow-outline"
        );
        contenedor.appendChild(inputNombreBolo);

        const labelDescripcionBolo =
            document.createElement("label");
        labelDescripcionBolo.textContent = "Descripción del bolo:";
        labelDescripcionBolo.classList.add(
            "block",
            "text-gray-700",
            "text-sm",
            "font-bold",
            "mb-2"
        );
        contenedor.appendChild(labelDescripcionBolo);

        const inputDescripcionBolo =
            document.createElement("textarea");
        inputDescripcionBolo.placeholder = "Descripción del bolo";
        inputDescripcionBolo.classList.add(
            "shadow",
            "appearance-none",
            "border",
            "rounded",
            "w-full",
            "py-2",
            "px-3",
            "text-gray-700",
            "leading-tight",
            "focus:outline-none",
            "focus:shadow-outline"
        );

        const botonSiguiente = document.createElement("button");
        botonSiguiente.type = "button";
        botonSiguiente.textContent = "Siguiente";
        botonSiguiente.classList.add(
            "bg-green-500",
            "hover:bg-green-700",
            "text-white",
            "font-bold",
            "py-2",
            "px-4",
            "rounded",
            "focus:outline-none",
            "focus:shadow-outline",
            "border",
            "border-green-600"
        );
        contenedor.appendChild(inputDescripcionBolo);
        contenedor.appendChild(botonSiguiente);

        botonSiguiente.addEventListener("click",()=>{
            datosBolo = { 
                nombre: document.querySelector("input[placeholder='Nombre del bolo']").value, 
                datos_relevantes: document.querySelector("textarea[placeholder='Descripción del bolo']").value 
            };
            console.log(datosBolo);
            generarFormularioAntes(compostera_id);
        })
    }
}

export function generarFormularioAntes(compostera_seleccionada) {
    compostera_id = compostera_seleccionada;
    // Seleccionamos el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");

    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "Temperatura Ambiental:", type: "number", name: "temperaturaAmbiental" },
        { label: "Temperatura Compostera:", type: "number", name: "temperaturaCompostera" },
        { label: "Nivel Llenado Inicial:", type: "select", name: "nivelLlenadoInicial", options: ['0','12,5','25','37.5','50','67.5','75','87.5','100']},
        { label: "Olor:", type: "select", name: "olor", options: ["Podrido", "Sin olor", "Amoníaco"] },
        { label: "Insectos:", type: "select", name: "insectos", options: ["Si", "No"] },
        { label: "Humedad:", type: "select", name: "humedad", options: ["Exceso", "Buena", "Defecto"] },
        { label: "Observación:", type: "textarea", name: "observacion" }
    ];

    const inputs = {}; // Objeto para almacenar referencias a los inputs

    campos.forEach(campo => {
        const label = document.createElement("label");
        label.textContent = campo.label;
        formulario.appendChild(label);

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
            campo.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else if (campo.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = campo.type;
        }
        input.name = campo.name;
        inputs[campo.name] = input; // Guardar referencia al input
        formulario.appendChild(input);
        formulario.appendChild(document.createElement("br"));
    });

    const botonAtras = document.createElement("button");
    botonAtras.type = "button";
    botonAtras.textContent = "Atras";
    botonAtras.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");

    // Crear el botón para pasar al siguiente formulario
    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    botonSiguiente.addEventListener("click", function () {
        // Guardar los datos del formulario en la variable datosFormularioAntes
        let temperaturaAmbiental = parseInt(inputs.temperaturaAmbiental.value);
        let temperaturaCompostera = parseInt(inputs.temperaturaCompostera.value);
        datosFormularioAntes = {
            temperaturaAmbiental: temperaturaAmbiental,
            temperaturaCompostera: temperaturaCompostera,
            nivelLlenadoInicial: inputs.nivelLlenadoInicial.value,
            olor: inputs.olor.value,
            insectos: inputs.insectos.value,
            humedad: inputs.humedad.value,
            observacion: inputs.observacion.value
        };
        console.log(datosFormularioAntes);

        // Limpiar el contenedor y generar el siguiente formulario
        generarFormularioDurante(compostera_id);
    });

    botonAtras.addEventListener("click",()=>{
        contenedor.innerHTML = "";
        generarFormularioRegistro();
    });
    formulario.appendChild(botonAtras);
    formulario.appendChild(botonSiguiente);
    

    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);
}


function generarFormularioDurante(compostera_seleccionada) {
    compostera_id = compostera_seleccionada;
    // Seleccionar el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");

    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "¿Riego?:", type: "select", name: "riego", options: ["Si", "No"] },
        { label: "¿Revolver?:", type: "select", name: "revolver", options: ["Si", "No"] },
        { label: "Aporte Verde:", type: "number", name: "aporte_verde" },
        { label: "Tipo de Aporte Verde:", type: "text", name: "tipo_aporte_verde" },
        { label: "Aporte Seco:", type: "number", name: "aporte_seco" },
        { label: "Tipo de Aporte Seco:", type: "text", name: "tipo_aporte_seco" },
        { label: "Observación:", type: "textarea", name: "observacion" }
    ];

    const inputs = {}; // Objeto para almacenar referencias a los inputs

    campos.forEach(campo => {
        const label = document.createElement("label");
        label.textContent = campo.label;
        formulario.appendChild(label);

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
            campo.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else if (campo.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = campo.type;
        }
        input.name = campo.name;
        inputs[campo.name] = input; // Guardar referencia al input
        formulario.appendChild(input);
        formulario.appendChild(document.createElement("br"));
    });
    const botonAtras = document.createElement("button");
    botonAtras.type = "button";
    botonAtras.textContent = "Atras";
    botonAtras.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    // Crear el botón para pasar al siguiente formulario
    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    botonSiguiente.addEventListener("click", function () {
        let aporte_seco = parseInt(inputs.aporte_seco.value);
        let aporte_verde = parseInt(inputs.aporte_verde.value);
        // Guardar los datos del formulario en la variable datosFormularioDurante
        datosFormularioDurante = {
            riego: inputs.riego.value,
            revolver: inputs.revolver.value,
            aporte_verde: aporte_verde || null,
            tipo_aporte_verde: inputs.tipo_aporte_verde.value,
            aporte_seco: aporte_seco || null,
            tipo_aporte_seco: inputs.tipo_aporte_seco.value,
            observacion: inputs.observacion.value
        };
        console.log(datosFormularioDurante);

        // Limpiar el contenedor y generar el siguiente formulario (si existe)
        generarFormularioDespues(compostera_id); // Puedes implementar esta función si necesitas otro formulario
    });

    botonAtras.addEventListener("click",()=>{
        contenedor.innerHTML = "";
        boton.classList.add("hidden");
        generarFormularioAntes();
    });
    formulario.appendChild(botonAtras);
    formulario.appendChild(botonSiguiente);

    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);
}

function generarFormularioDespues(compostera_seleccionada) {
    compostera_id = compostera_seleccionada;
    // Seleccionar el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");


    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "Nivel de Llenado Final:", type: "select", name: "nivelLlenadoFinal", options: ["0", "12,5", "25"] },
        { label: "Observación:", type: "textarea", name: "observacion" },
        {label: "Quieres terminar un ciclo", type:"checkbox", name: "terminaCiclo"},
    ];

    const inputs = {}; // Objeto para almacenar referencias a los inputs

    campos.forEach(campo => {
        const label = document.createElement("label");
        label.textContent = campo.label;
        formulario.appendChild(label);

        let input;
        if (campo.type === "select") {
            input = document.createElement("select");
            campo.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
        } else if (campo.type === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = campo.type;
        }
        input.name = campo.name;
        inputs[campo.name] = input; // Guardar referencia al input
        formulario.appendChild(input);
        formulario.appendChild(document.createElement("br"));
    });

    // Crear el botón para enviar los datos
    const botonAtras = document.createElement("button");
    botonAtras.type = "button";
    botonAtras.textContent = "Atras";
    botonAtras.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    const botonEnviar = document.createElement("button");
    botonEnviar.type = "button";
    botonEnviar.textContent = "Enviar";
    botonEnviar.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "focus:outline-none", "focus:shadow-outline", "border", "border-green-600");
    botonEnviar.addEventListener("click", function () {
        // Guardar los datos del formulario en la variable datosFormularioDespues
        datosFormularioDespues = {
            nivelLlenadoFinal: inputs.nivelLlenadoFinal.value,
            observacion: inputs.observacion.value
        };
        const terminaCiclo = inputs["terminaCiclo"].checked;
        console.log(terminaCiclo);
        console.log(datosFormularioDespues);
        insertarRegistros(datosBolo,datosFormularioRegistro, datosFormularioAntes, datosFormularioDurante, datosFormularioDespues,compostera_id,terminaCiclo);
    });

    botonAtras.addEventListener("click",()=>{
        contenedor.innerHTML = "";
        generarFormularioDurante(compostera_id);
    });
    formulario.appendChild(botonAtras);
    formulario.appendChild(botonEnviar);


    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);

    console.log(user_id);
    console.log(datosBolo);
}

function obtenerFechaFormatoCorrecto() {
    const fecha = new Date();
    return fecha.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
}


//Primero tienes que introducir el registro a la tabla


async function insertarRegistros(datosBolo,datosFormularioRegistro, datosFormularioAntes, datosFormularioDurante, datosFormularioDespues, id_compostera, terminaCiclo) {
    try {
        compostera_id = id_compostera;
        const cicloTerminado = terminaCiclo;

        // Consultar estado actual de la compostera
        const urlCompostera = `/api/composteras/${compostera_id}`;
        const compostera = await consulta(urlCompostera);
        const estadoCompostera = compostera.data.ocupada;

        const obtenerFechaFormatoCorrecto = () => {
            const fecha = new Date();
            return fecha.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
        };

        if (compostera_id === 1 && !estadoCompostera) {
            if (Object.keys(datosBolo).length > 0) {
                console.log(datosBolo);
                // Insertar bolo
                const urlBolo = '/api/bolos';
                const responseBolo = await fetch(urlBolo, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(datosBolo),
                });

                if (!responseBolo.ok) {
                    throw new Error("Error al insertar el Bolo.");
                }

                const BoloCreado = await responseBolo.json();
                console.log(`Bolo creado con éxito:`, BoloCreado);

                datosCiclo = {
                    fecha_inicio: obtenerFechaFormatoCorrecto(),
                    bolo_id: BoloCreado.data.id,
                    compostera_id: compostera_id,
                };
            }

            // Insertar ciclo
            const urlCiclo = '/api/ciclos';
            const responseCiclo = await fetch(urlCiclo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(datosCiclo),
            });

            if (!responseCiclo.ok) {
                throw new Error("Error al insertar el Ciclo");
            }

            const CicloCreado = await responseCiclo.json();
            console.log(`Ciclo creado con éxito:`, CicloCreado);
        } else if (compostera_id === 2 && !estadoCompostera) {
            console.log("Esta entrando aqui");
            const urlBoloCompostera2 = '/api/bolo/compostera2';
            const boloCompostera2 = await consulta(urlBoloCompostera2);
            console.log(boloCompostera2);
            const idBolo = boloCompostera2.id;
            console.log(`El id del bolo es ${idBolo}`);

            const datosCiclo = {
                fecha_inicio: obtenerFechaFormatoCorrecto(),
                bolo_id: idBolo,
                compostera_id: compostera_id,
            };

            const urlCiclo = '/api/ciclos';
            const responseCiclo = await fetch(urlCiclo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(datosCiclo),
            });

            if (!responseCiclo.ok) {
                throw new Error("Error al insertar el ciclo para compostera 2.");
            }

            const cicloCreado = await responseCiclo.json();
            console.log("Ciclo creado para compostera 2:", cicloCreado);
        } else if (compostera_id === 3 && !estadoCompostera) {
            // Obtener bolo disponible para compostera 3
            const urlBoloCompostera3 = '/api/bolo/compostera3';
            const boloCompostera3 = await consulta(urlBoloCompostera3);
            console.log(boloCompostera3);

            const idBolo = boloCompostera3.id;

            const datosCiclo = {
                fecha_inicio: obtenerFechaFormatoCorrecto(),
                bolo_id: idBolo,
                compostera_id: compostera_id,
            };

            const urlCiclo = '/api/ciclos';
            const responseCiclo = await fetch(urlCiclo, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(datosCiclo),
            });

            if (!responseCiclo.ok) {
                throw new Error("Error al insertar el ciclo para compostera 3.");
            }

            const cicloCreado = await responseCiclo.json();
            console.log("Ciclo creado para compostera 3:", cicloCreado);
        }

        // Consultar el último ciclo asociado a la compostera
        const urlConsultaCiclo = `/api/compostera/${id_compostera}/ciclos?limit=100`;
        const todosCiclo = await consulta(urlConsultaCiclo);
        const ultimoCiclo = todosCiclo.data.sort((a, b) => b.id - a.id)[0];

        if (!ultimoCiclo) {
            throw new Error("No se encontró el último Ciclo.");
        }

        const ultimobolo_id = ultimoCiclo.bolo_id;
        const ultimociclo_id = ultimoCiclo.id;

        datosFormularioRegistro = {
            ciclo_id: ultimociclo_id,
            user_id: user_id,
            compostera_id: compostera_id,
        };

        console.log(datosFormularioRegistro);

        // Insertar el registro inicial
        const urlRegistro = '/api/registros';
        const responseRegistro = await fetch(urlRegistro, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosFormularioRegistro),
        });

        if (!responseRegistro.ok) {
            throw new Error("Error al insertar el registro inicial.");
        }

        const registroCreado = await responseRegistro.json();
        console.log('Registro creado con éxito:', registroCreado);

        // Consultar el último registro insertado
        const urlConsultaRegistro = '/api/registro/last';
        const ultimoRegistro = await consulta(urlConsultaRegistro);

        if (!ultimoRegistro) {
            throw new Error("No se encontró el último Registro.");
        }

        const registro_id = ultimoRegistro.id;
        console.log("ID del último Registro:", registro_id);

        // Actualizar formularios con el ID del registro
        datosFormularioAntes.registro_id = registro_id;
        datosFormularioDurante.registro_id = registro_id;
        datosFormularioDespues.registro_id = registro_id;

        // Insertar datos adicionales en las tablas relacionadas
        await insertarTabla('api/antes', datosFormularioAntes, 'antes');
        await insertarTabla('api/durantes', datosFormularioDurante, 'durante');
        await insertarTabla('api/despues', datosFormularioDespues, 'despues');

        //Logica para cerrar bolos y ciclos

        // Finalizar ciclo y bolo si corresponde
        if(cicloTerminado){
            if(id_compostera == 1){
                const urlConsultaCiclo = `/api/compostera/${id_compostera}/ciclos?limit=100`;
                const todosCiclo = await consulta(urlConsultaCiclo);
                const ultimoregistro = todosCiclo.data.filter(ciclo => !ciclo.terminado).sort((a, b) => b.id - a.id)[0];
                const ultimobolo_id = ultimoregistro.bolo_id;
                const ultimociclo_id = ultimoregistro.id;
                console.log("Esta entrando");
                console.log(ultimobolo_id);
                console.log(ultimociclo_id);
                const estado_bolo = {
                    "ciclo1": true
                }
                const estado_ciclo = {
                    "fecha_fin": obtenerFechaFormatoCorrecto(),
                    "terminado": 1,
                }
                const estado_compostera ={
                    "ocupada": false
                }
                console.log("Estado enviado:", JSON.stringify(estado_bolo));
                await cerrarBolo(ultimobolo_id,estado_bolo);
                await cerrarCiclo(ultimociclo_id,estado_ciclo);
                await actualizarEstadoCompostera(compostera_id, estado_compostera) ;
            }
            else if(compostera_id == 2){
                const urlConsultaCiclo = `/api/compostera/${id_compostera}/ciclos?limit=100`;
                const todosCiclo = await consulta(urlConsultaCiclo);
                const ultimoregistro = todosCiclo.data.filter(ciclo => !ciclo.terminado).sort((a, b) => b.id - a.id)[0];
                const ultimobolo_id = ultimoregistro.bolo_id;
                const ultimociclo_id = ultimoregistro.id;
                console.log("Esta entrando");
                console.log(ultimobolo_id);
                console.log(ultimociclo_id);
                const estado_bolo = {
                    "ciclo2": true
                }
                const estado_ciclo = {
                    "fecha_fin": obtenerFechaFormatoCorrecto(),
                    "terminado": 1,
                }
                const estado_compostera ={
                    "ocupada": false
                }
                console.log("Estado enviado:", JSON.stringify(estado_bolo));
                await cerrarBolo(ultimobolo_id,estado_bolo);
                await cerrarCiclo(ultimociclo_id,estado_ciclo);
                await actualizarEstadoCompostera(compostera_id, estado_compostera) ;
            }
            else if(compostera_id == 3){
                console.log("Entra aqui");
                const urlConsultaCiclo = `/api/compostera/${id_compostera}/ciclos?limit=100`;
                const todosCiclo = await consulta(urlConsultaCiclo);
                console.log(todosCiclo);
                const ultimoregistro = todosCiclo.data.filter(ciclo => !ciclo.terminado).sort((a, b) => b.id - a.id)[0];
                const ultimobolo_id = ultimoregistro.bolo_id;
                const ultimociclo_id = ultimoregistro.id;
                console.log("Esta entrando");
                console.log(ultimobolo_id);
                console.log(ultimociclo_id);
                const estado_bolo = {
                    "ciclo3": true,
                    "terminado": true
                }
                const estado_ciclo = {
                    "fecha_fin": obtenerFechaFormatoCorrecto(),
                    "terminado": 1,
                }
                const estado_compostera ={
                    "ocupada": false
                }
                console.log("Estado enviado:", JSON.stringify(estado_bolo));
                await cerrarBolo(ultimobolo_id,estado_bolo);
                await cerrarCiclo(ultimociclo_id,estado_ciclo);
                await actualizarEstadoCompostera(compostera_id, estado_compostera) ;
            }
        }

        // Actualizar compostera si estaba libre
        if (!estadoCompostera) {
            const estado_compostera = { ocupada: true };
            await actualizarEstadoCompostera(compostera_id, estado_compostera);
        }

        cargarComposteras("Has guardado el registro con éxito");
    } catch (error) {
        console.error('Error en el proceso:', error);
    }
}



// Función auxiliar para insertar en una tabla
async function insertarTabla(url, datos, nombreTabla) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datos),
    });

    if (!response.ok) {
        throw new Error(`Error al insertar en la tabla '${nombreTabla}'.`);
    }

    const resultado = await response.json();
    console.log(`Éxito en tabla ${nombreTabla}:`, resultado);
}

// Función auxiliar para consultar datos desde la API
async function consulta(url) {
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (!response.ok) {
        if (response.status === 404) {
            return null; // Registro no encontrado
        }
        throw new Error("Error en la consulta de la API.");
    }
    return await response.json();
}

async function actualizarEstadoCompostera(compostera_id, estado_compostera) {
    const urlCambiarestado = `/api/composteras/${compostera_id}`;

    try {
        const response = await fetch(urlCambiarestado, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(estado_compostera),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la compostera');
        }

        const data = await response.json();
        console.log('Compostera actualizada con éxito:', data);
        return data; // Retorna la respuesta si es necesario
    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanza el error para que pueda ser manejado en otro lugar si es necesario
    }
}

async function cerrarBolo(bolo_id,estado_bolo) {
    const urlCerrarBolo = `/api/bolos/${bolo_id}`;
    try {
        const response = await fetch(urlCerrarBolo, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(estado_bolo),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar los datos del bolo');
        }

        const data = await response.json();
        console.log('Bolo actualizado con exito:', data);
        return data; // Retorna la respuesta si es necesario
    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanza el error para que pueda ser manejado en otro lugar si es necesario
    }
}

async function cerrarCiclo(ciclo_id,estado_ciclo) {
    const urlCerrarCiclo = `/api/ciclos/${ciclo_id}`;
    try {
        const response = await fetch(urlCerrarCiclo, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(estado_ciclo),
        });

        if (!response.ok) {
            throw new Error('Error al cerrar el ciclo 1 del bolo');
        }

        const data = await response.json();
        console.log('Ciclo cerrado con exito:', data);
        return data; // Retorna la respuesta si es necesario
    } catch (error) {
        console.error('Error:', error);
        throw error; // Lanza el error para que pueda ser manejado en otro lugar si es necesario
    }
}





