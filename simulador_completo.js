
  let clientes = [{ cedula: "1712345678", nombre: "Juan", apellido: "Pérez", ingresos: 1200, egresos: 500 },
{ cedula: "1723456789", nombre: "María", apellido: "Gómez", ingresos: 1500, egresos: 600 },
{ cedula: "1734567890", nombre: "Carlos", apellido: "Ramírez", ingresos: 900, egresos: 350 }];

  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let clienteActual = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  //Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

  //recupera el componente
  //let componente = document.getElementById("parametros");

  //recupera la lista de clases del componente
  //let listaClass = componente.classList;

  //agrega o elimina la clase
  //listaClass.add("activa");
  //listaClass.remove("activa");

  //forma simplificada(una sola linea)
  //document.getElementById("parametros").classList.add("activa");
  //document.getElementById("parametros").classList.remove("activa");

  ocultarSecciones = function(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("creditos").classList.remove("activa");
    
  }

  mostrarSeccion = function(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
  }

  guardarTasa = function (){
    let tasa = recuperarFloat("tasaInteres");
    let mensaje = document.getElementById("mensajeTasa");

    if (isNaN(tasa) || tasa < 10 || tasa > 20) {
        mensaje.innerText = "Error: la tasa debe estar entre 10% y 20%.";
        return;
    }

    tasaInteres = tasa;

    mensaje.innerText =
        "Tasa configurada correctamente: " + tasaInteres + "%";
}

  guardarCliente = function(){
    let cedula = recuperaraTexto("txtCedula");
    let nombre = recuperaraTexto("txtNombre");
    let apellido = recuperaraTexto("txtApellido");
    let ingresos = recuperarInt("txtIngresos");
    let egresos = recuperarInt("txtEgresos");

    let clienteExistente = buscarCliente(cedula);
    if(clienteExistente == null){
  //Si no existe--crear cliente nuevo
  //objeto cliente
    let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  }

  clientes.push(cliente);
  alert("Cliente guardado correctamente");
    }else {
      //Si existe --Actualizar(excepto cedula)
      clienteExistente.nombre = nombre;
      clienteExistente.apellido = apellido;
      clienteExistente.ingresos= ingresos;
      clienteExistente.egresos= egresos;
      //la cedula no se toca
      alert("Cliente actualizado correctamente");
    }

  pintarClientes();
  limpiar(); // limpiar despues de guardar
  document.getElementById("txtCedula").disabled = false;
}


  pintarClientes = function(){
    let cmpTabla = document.getElementById("tablaClientes");
    let elementoCliente;
    let contenidoTabla = "";
    for(let i=0; i<clientes.length; i++){
        elementoCliente = clientes[i];
        contenidoTabla += "<tr><td>"+elementoCliente.cedula+"</td>"+
        "<td>"+elementoCliente.nombre+"</td>"+
        "<td>"+elementoCliente.apellido+"</td>"+
        "<td>"+elementoCliente.ingresos+"</td>"+
        "<td>"+elementoCliente.egresos+"</td>"+

        "<td><button onclick='seleccionarCliente(\""+ elementoCliente.cedula + "\")'>Actualizar</button>" +
        "<button onclick='eliminarCliente(\"" + elementoCliente.cedula + "\")'>Eliminar</button></td>" +
        "</tr>"
    }
    cmpTabla.innerHTML = contenidoTabla;
  }

  buscarCliente = function(cedula){
    let elementoCliente;
    let clienteEncontrado = null;

    for(let i=0; i<clientes.length; i++){
        elementoCliente = clientes[i];
        if(elementoCliente.cedula == cedula){
            clienteEncontrado = elementoCliente;
            break;
        }
    }
    return clienteEncontrado;
  }
 
  seleccionarCliente = function(cedula){
  //cedula = recuperaraTexto("txtCedula");
  let cliente = buscarCliente(cedula);
  clienteSeleccionado = cliente;

  if(clienteSeleccionado != null){
    mostrarTextoEnCaja("txtCedula", clienteSeleccionado.cedula);
    document.getElementById("txtCedula").disabled = true;
    mostrarTextoEnCaja("txtNombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("txtApellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("txtIngresos", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("txtEgresos", clienteSeleccionado.egresos);
    }
  }

  limpiar = function(){
  mostrarTextoEnCaja("txtCedula", "");
  mostrarTextoEnCaja("txtNombre", "");
  mostrarTextoEnCaja("txtApellido", "");
  mostrarTextoEnCaja("txtIngresos", "");
  mostrarTextoEnCaja("txtEgresos", "");

   document.getElementById("txtCedula").focus();
}

  eliminarCliente = function(cedula){
  let clienteEncontrado = buscarCliente(cedula);
  let indice = clientes.indexOf(clienteEncontrado);
  if(indice != -1){
  clientes.splice(indice, 1);
  pintarClientes();
  limpiar();
}
}
// parte 2 taller de simulacion
// 1. FUNCIÓN PARA BUSCAR CLIENTE
   buscarClienteCredito = function(){
    let cedula = document.getElementById("buscarCedulaCredito").value;
    let cmpDatos = document.getElementById("datosClienteCredito");
    let cmpResultado = document.getElementById("resultadoCredito");
    
    // Limpiar todo
    cmpDatos.innerHTML = "";
    cmpResultado.innerHTML = "";
    document.getElementById("btnSolicitarCredito").disabled = true;
    clienteActual = null;

    if (cedula.trim() === "") {
        cmpDatos.innerHTML = `<p style="color: orange;">Ingresa una cédula</p>`;
        return;
    }

    let clienteEncontrado = buscarCliente(cedula);

    if (clienteEncontrado != null) {
        clienteActual = clienteEncontrado; // Guardamos el cliente para usarlo después
        let contenido = `
            <h3>Cliente Encontrado</h3>
            <p><strong>Cédula:</strong> ${clienteEncontrado.cedula}</p>
            <p><strong>Nombre:</strong> ${clienteEncontrado.nombre}</p>
            <p><strong>Apellido:</strong> ${clienteEncontrado.apellido}</p>
            <p><strong>Ingresos:</strong> $${clienteEncontrado.ingresos}</p>
            <p><strong>Egresos:</strong> ${clienteEncontrado.egresos}</p>
        `;
        cmpDatos.innerHTML = contenido;
    } else {
        cmpDatos.innerHTML = `<p style="color: red;">Cliente no encontrado</p>`;
    }
}

// 2. FUNCIÓN PARA CALCULAR CRÉDITO 
// Usar tus funciones antiguas: calcularDisponible, calcularCapacidadPago, etc,
   calcularCredito = function(){
    let cmpResultado = document.getElementById("resultadoCredito");
    let btnSolicitar = document.getElementById("btnSolicitarCredito");

    cmpResultado.className = "";
    btnSolicitar.disabled = true;
    creditoAprobado = false;
    cuotaCalculada = 0;

    // Validar que ya se buscó un cliente
    if (clienteActual == null) {
        cmpResultado.innerText = "Primero busca un cliente.";
        return;
    }

    // Tomar valores del HTML usando tus funciones antiguas
    let ingresos = clienteActual.ingresos; // Del cliente, no de input
    let egresos = clienteActual.egresos;   // Del cliente, no de input
    let monto = parseFloat(document.getElementById("montoCredito").value);
    let plazoAnios = parseInt(document.getElementById("plazoCredito").value);

    // Validar monto y plazo
    if (isNaN(monto) || isNaN(plazoAnios) || monto <= 0 || plazoAnios <= 0) {
        cmpResultado.innerText = "Ingresa monto y plazo válidos.";
        return;
    }

    // Usar TODAS tus funciones antiguas de funciones.js
    let montoDisponible = calcularDisponible(ingresos, egresos);
    let capacidadPago = calcularCapacidadPago(montoDisponible);
    let interes = calcularInteresSimple(monto, tasaInteres, plazoAnios);
    let totalPagar = calcularTotalPagar(monto, interes);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);

    cuotaCalculada = cuotaMensual;
    montoCalculado = monto;
    plazoCalculado = plazoAnios;

    creditoAprobado = aprobarCredito(capacidadPago, cuotaMensual);

    // Mostrar el detalle en resultadoCredito
    let resultado = `
        <h3>Resultado del Cálculo</h3>
        <p><strong>Tasa de interes:</strong> $${tasaInteres}%</p>
        <p><strong>Disponible:</strong> $${montoDisponible.toFixed(2)}</p>
        <p><strong>Capacidad de Pago:</strong> $${capacidadPago.toFixed(2)}</p>
        <p><strong>Interés:</strong> $${interes.toFixed(2)}</p>
        <p><strong>Total a Pagar:</strong> $${totalPagar.toFixed(2)}</p>
        <p><strong>Cuota Mensual:</strong> $${cuotaMensual.toFixed(2)}</p>
        <p><strong>RESULTADO: ${creditoAprobado ? "APROBADO" : "RECHAZADO"}</strong></p>
    `;

    cmpResultado.innerHTML = resultado;
    cmpResultado.className = creditoAprobado ? "aprobado" : "rechazado";

    btnSolicitar.disabled = !creditoAprobado;
};

  
 

