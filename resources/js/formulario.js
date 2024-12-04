import {generarComposteras} from "/resources/js/composteras";

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
        insertarRegistros(datosFormularioRegistro, datosFormularioAntes, datosFormularioDurante, datosFormularioDespues,compostera_id)
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


async function insertarRegistros(datosFormularioRegistro, datosFormularioAntes, datosFormularioDurante, datosFormularioDespues,id_compostera) {
    
    try {
        compostera_id = id_compostera;
        if (Object.keys(datosBolo).length > 0) {
            const urlBolo = 'api/bolos';
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

            const BoloCreado = await responseBolo.json(); // Cambié a responseBolo
            console.log(`Bolo creado con éxito:`, BoloCreado);

            const urlConsultaBolo = '/api/bolo/last';
            const ultimobolo = await consulta(urlConsultaBolo);
            const idBolo = ultimobolo.id;


            datosCiclo ={
                fecha_inicio:obtenerFechaFormatoCorrecto(),
                bolo_id: idBolo,
                compostera_id : compostera_id,
            }
            console.log(datosCiclo);

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

            const CicloCreado = await responseCiclo.json(); //
            console.log(`Ciclo creado con éxito:`, CicloCreado);
        }

        function obtenerFechaFormatoCorrecto() {
            const fecha = new Date();
            return fecha.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (YYYY-MM-DD)
        }

        // Consultar el último ciclo insertado en el bolo
        const urlConsultaCiclo = `/api/compostera/${id_compostera}/ciclos`;
        const todosCiclo = await consulta(urlConsultaCiclo);


        if (!todosCiclo) {
            throw new Error("No se encontró el último Ciclo.");
        }

        const ultimoCiclo = todosCiclo.data.sort((a, b) => b.id - a.id)[0];
        console.log("Último ciclo:", ultimoCiclo);
        const ultimobolo_id = todosCiclo.data[0].bolo_id;
        const ultimociclo_id = todosCiclo.data[0].id;
        datosFormularioRegistro = {
            ciclo_id : ultimociclo_id,
            user_id : user_id,
            compostera_id:compostera_id,
        }
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

        // Insertar en la tabla "antes"
        await insertarTabla('api/antes', datosFormularioAntes, 'antes');

        // Insertar en la tabla "durantes"
        await insertarTabla('api/durantes', datosFormularioDurante, 'durante');

        // Insertar en la tabla "despues"
        await insertarTabla('api/despues', datosFormularioDespues, 'despues');


    } catch (error) {
        console.error('Error en el proceso:', error);
    }
    const estado_compostera ={
        "ocupada": true,
    }

    await actualizarEstadoCompostera(compostera_id, estado_compostera) ;
    
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





