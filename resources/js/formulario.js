

const boton = document.querySelector('#nuevoRegistro');
let user_id = document.querySelector('#user_id').value;


let datosFormularioRegistro = {}; // Objeto para almacenar los datos del primer formulario
let datosFormularioAntes = {};
let datosFormularioDespues = {};
let datosFormularioDurante = {};

function generarFormularioRegistro() {
    // Seleccionamos el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");

    // Crear el campo para elegir una compostera
    const labelCompostera = document.createElement("label");
    labelCompostera.textContent = "Elegir una compostera:";
    formulario.appendChild(labelCompostera);

    const selectCompostera = document.createElement("select");
    const opcionesCompostera = ["Compostera 1", "Compostera 2", "Compostera 3"];
    opcionesCompostera.forEach(opcionTexto => {
        const opcion = document.createElement("option");
        opcion.value = opcionTexto;
        opcion.textContent = opcionTexto;
        selectCompostera.appendChild(opcion);
    });
    formulario.appendChild(selectCompostera);
    formulario.appendChild(document.createElement("br"));

    // Crear el campo para indicar si inicia un ciclo
    const labelCiclo = document.createElement("label");
    labelCiclo.textContent = "¿Inicia un ciclo?:";
    formulario.appendChild(labelCiclo);

    const inputCiclo = document.createElement("input");
    inputCiclo.type = "checkbox";
    formulario.appendChild(inputCiclo);
    formulario.appendChild(document.createElement("br"));

    // Crear el campo para a qué bolo pertenece
    const labelBolo = document.createElement("label");
    labelBolo.textContent = "¿A qué bolo pertenece?:";
    formulario.appendChild(labelBolo);

    const inputBolo = document.createElement("input");
    inputBolo.type = "number";
    formulario.appendChild(inputBolo);
    formulario.appendChild(document.createElement("br"));

    // Crear el botón para pasar al siguiente formulario
    const botonSiguiente = document.createElement("button");
    
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
    botonSiguiente.addEventListener("click", function() {
        let compostera_id;
        // Guardar los datos del primer formulario en un objeto
        if(selectCompostera.value === "Compostera 1"){
            compostera_id = 1;
        }
        else if(selectCompostera.value === "Compostera 2"){
            compostera_id = 2;
        }
        else if(selectCompostera.value === "Compostera 3"){
            compostera_id = 3;
        }
        user_id = parseInt(user_id);
        let bolo = parseInt(inputBolo.value);
        datosFormularioRegistro = {
            inicioCiclo: inputCiclo.checked,
            user_id: user_id,
            compostera_id: compostera_id,
            bolo_id: bolo
        };
        // Conversión de los valores a números enteros
        console.log(datosFormularioRegistro);
        // Limpiar el contenedor y generar el siguiente formulario
        generarFormularioAntes();
    });
    
    formulario.appendChild(botonSiguiente);

    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);
}

function generarFormularioAntes() {
    // Seleccionamos el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");

    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "Temperatura Ambiental:", type: "number", name: "temperaturaAmbiental" },
        { label: "Temperatura Compostera:", type: "number", name: "temperaturaCompostera" },
        { label: "Nivel Llenado Inicial:", type: "select", name: "nivelLlenadoInicial", options: ["0", "12.5", "25"] },
        { label: "Olor:", type: "select", name: "olor", options: ["Podrido", "Sin olor", "Amoníaco"] },
        { label: "Insectos:", type: "select", name: "insectos", options: ["Si", "No"] },
        { label: "Humedad:", type: "select", name: "humedad", options: ["Exceso", "Buena", "Defecto"] },
        { label: "Foto:", type: "file", name: "foto" },
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

    // Crear el botón para pasar al siguiente formulario
    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
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
        generarFormularioDurante();
    });

    formulario.appendChild(botonSiguiente);

    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);
}


function generarFormularioDurante() {
    // Seleccionar el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");

    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "ID del Registro:", type: "number", name: "registro_id" },
        { label: "¿Riego?:", type: "select", name: "riego", options: ["Si", "No"] },
        { label: "¿Revolver?:", type: "select", name: "revolver", options: ["Si", "No"] },
        { label: "Aporte Verde:", type: "number", name: "aporte_verde" },
        { label: "Tipo de Aporte Verde:", type: "text", name: "tipo_aporte_verde" },
        { label: "Aporte Seco:", type: "number", name: "aporte_seco" },
        { label: "Tipo de Aporte Seco:", type: "text", name: "tipo_aporte_seco" },
        { label: "Foto:", type: "file", name: "foto" },
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

    // Crear el botón para pasar al siguiente formulario
    const botonSiguiente = document.createElement("button");
    botonSiguiente.type = "button";
    botonSiguiente.textContent = "Siguiente";
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
        generarFormularioDespues(); // Puedes implementar esta función si necesitas otro formulario
    });

    formulario.appendChild(botonSiguiente);

    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);
}

function generarFormularioDespues() {
    // Seleccionar el contenedor donde estará el formulario
    const contenedor = document.querySelector("#Datos");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    // Crear el formulario
    const formulario = document.createElement("form");


    // Crear los campos del formulario según las especificaciones
    const campos = [
        { label: "ID del Registro:", type: "number", name: "registro_id" },
        { label: "Nivel de Llenado Final:", type: "select", name: "nivelLlenadoFinal", options: ["0", "12,5", "25"] },
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

    // Crear el botón para enviar los datos
    const botonEnviar = document.createElement("button");
    botonEnviar.type = "button";
    botonEnviar.textContent = "Enviar";
    botonEnviar.addEventListener("click", function () {
        // Guardar los datos del formulario en la variable datosFormularioDespues
        datosFormularioDespues = {
            nivelLlenadoFinal: inputs.nivelLlenadoFinal.value,
            observacion: inputs.observacion.value
        };
        console.log(datosFormularioDespues);
        insertarRegistros(datosFormularioRegistro, datosFormularioAntes, datosFormularioDurante, datosFormularioDespues)
    });

    formulario.appendChild(botonEnviar);


    // Agregar el formulario al contenedor
    contenedor.appendChild(formulario);

    console.log(user_id);
}



//Primero tienes que introducir el registro a la tabla


async function insertarRegistros(datosFormularioRegistro, datosFormularioAntes, datosFormularioDurante, datosFormularioDespues) {
    try {
        // Insertar el registro inicial en la API
        const urlRegistro = '/api/registros';
        const responseRegistro = await fetch(urlRegistro, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosFormularioRegistro)
        });

        if (!responseRegistro.ok) {
            throw new Error("Error al insertar el registro inicial.");
        }

        const registroCreado = await responseRegistro.json();
        console.log('Registro creado:', registroCreado);

        // Consultar el último registro insertado
        const urlConsulta = '/api/registro/last';
        const ultimoRegistro = await consulta(urlConsulta);

        if (!ultimoRegistro) {
            throw new Error("No se encontró el último registro.");
        }

        const registro_id = ultimoRegistro.id;
        console.log("ID del último registro:", registro_id);

        // Actualizar datos de los formularios con el ID del registro
        datosFormularioAntes.registro_id = registro_id;
        datosFormularioDurante.registro_id = registro_id;
        datosFormularioDespues.registro_id = registro_id;

        // Insertar en la tabla "antes"
        const urlAntes = 'api/antes';
        const responseAntes = await fetch(urlAntes, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosFormularioAntes)
        });

        if (!responseAntes.ok) {
            throw new Error("Error al insertar en la tabla 'antes'.");
        }

        const datosAntes = await responseAntes.json();
        console.log('Éxito en tabla antes:', datosAntes);

        // Insertar en la tabla "durantes"
        const urlDurante = '/api/durantes';
        const responseDurante = await fetch(urlDurante, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosFormularioDurante)
        });

        if (!responseDurante.ok) {
            throw new Error("Error al insertar en la tabla 'durantes'.");
        }

        const datosDurante = await responseDurante.json();
        console.log('Éxito en tabla durante:', datosDurante);

        // Insertar en la tabla "despues"
        const urlDespues = '/api/despues';
        const responseDespues = await fetch(urlDespues, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosFormularioDespues)
        });

        if (!responseDespues.ok) {
            throw new Error("Error al insertar en la tabla 'despues'.");
        }

        const datosDespues = await responseDespues.json();
        console.log('Éxito en tabla despues:', datosDespues);

    } catch (error) {
        console.error('Error en el proceso:', error);
    }
}

// Función auxiliar para consultar datos desde la API
async function consulta(url) {
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            return null; // Registro no encontrado
        }
        throw new Error("Error en la consulta de la API.");
    }
    return await response.json();
}




export {generarFormularioRegistro};