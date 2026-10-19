
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
    document.getElementById("listaCreditos").classList.remove("activa");
    
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
        <p><strong>Tasa de interes:</strong> ${tasaInteres}%</p>
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

// 3. FUNCIÓN PARA SOLICITAR
  asignarCredito = function(){
   if (clienteActual == null || !creditoAprobado || cuotaCalculada <= 0) {
        alert("Primero calcula y aprueba el crédito.");
        return;
    }
  
  let nuevoCredito = {
    cedula: clienteActual.cedula,
    nombre: clienteActual.nombre,
    apellido: clienteActual.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: (plazoCalculado * 12) +  " meses ",
    cuota: cuotaCalculada.toFixed(2)
  };
  
  creditos.push(nuevoCredito);
  pintarCreditos(creditos); // ← pinta la tabla
  alert("Crédito registrados correctamente.");
  
  // Limpiar
  document.getElementById("btnSolicitarCredito").disabled = true;
  document.getElementById("resultadoCredito").innerHTML = "";
  document.getElementById("resultadoCredito").className = "";
  document.getElementById("datosClienteCredito").innerHTML = "";
  document.getElementById("buscarCedulaCredito").value = "";
  document.getElementById("montoCredito").value = "";
  document.getElementById("plazoCredito").value = "";

  clienteActual = null;
  creditoAprobado = false;
  cuotaCalculada = 0;
}
buscarCreditos = function(cedula){
    let creditosEncontrados = [];

    for(let i = 0; i < creditos.length; i++){
        if(creditos[i].cedula === cedula){
            creditosEncontrados.push(creditos[i]);
        }
    }

    return creditosEncontrados;
}

 pintarCreditos = function(listaCreditos) {
  let cmpTabla = document.getElementById("tablaCreditos");
  let contenidoTabla = "";
  for(let i=0; i<listaCreditos.length; i++){
    let c = listaCreditos[i];

    // Buscar la posición real en el arreglo original
        let indiceReal = creditos.indexOf(c);
    
    contenidoTabla += `
      <tr>
        <td>${c.cedula}</td>
        <td>${c.nombre}</td>
        <td>${c.apellido}</td>
        <td>${Number(c.monto).toFixed(2)}</td>
        <td>${c.tasa}%</td>
        <td>${c.plazo}</td>
        <td>${Number(c.cuota).toFixed(2)}</td>
        <td><button onclick="eliminarCredito(${indiceReal})">Eliminar</button></td>
      </tr>
    `;
  }
  cmpTabla.innerHTML = contenidoTabla;
}

  eliminarCredito = function(indice){
     if (indice < 0 || indice >= creditos.length) {
        return;
    }

    let confirmar = confirm("¿Deseas eliminar este crédito?");

    if (confirmar) {
        creditos.splice(indice, 1);
        pintarCreditos(creditos);
    }
}

  buscarCreditosCliente = function(){
    let cedula = document.getElementById("buscarCedulaListado").value;
    
    if (cedula === "") {
        alert("Ingresa una cédula para buscar.");
        return;
    }

    let creditosFiltrados = creditos.filter(c => c.cedula === cedula);
    
    if (creditosFiltrados.length === 0) {
      document.getElementById("tablaCreditos").innerHTML = "";
      alert("No hay créditos registrados para esa cédula");
        
      return;
    }

    pintarCreditos(creditosFiltrados); // Reusa la misma función
}

pintarClientes();
pintarCreditos(creditos);
mostrarSeccion("parametros")

mostrarTodosLosCreditos = function() {
    document.getElementById("buscarCedulaListado").value = "";
    pintarCreditos(creditos);
};


  
 

