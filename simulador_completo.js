
  let clientes = [{ cedula: "1712345678", nombre: "Juan", apellido: "Pérez", ingresos: 1200, egresos: 500 },
{ cedula: "1723456789", nombre: "María", apellido: "Gómez", ingresos: 1500, egresos: 600 },
{ cedula: "1734567890", nombre: "Carlos", apellido: "Ramírez", ingresos: 900, egresos: 350 }];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
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
  }

  mostrarSeccion = function(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
  }

  guardarTasa = function(){
    let cmpTasaInteres = document.getElementById("tasaInteres");
    let tasa = parseInt(cmpTasaInteres.value);
    if(tasa >= 10 && tasa <=20){
      document.getElementById("mensajeTasa").innerHTML = "Tasa configurada correctamente: " + tasa + "%";
    }else {
      document.getElementById("mensajeTasa").innerHTML = "Error: La tasa debe estar entre 10% y 20%";

    }
  }

  guardarCliente = function(){
    let cedula = recuperaraTexto("txtCedula");
    let nombre = recuperaraTexto("txtNombre");
    let apellido = recuperaraTexto("txtApellido");
    let ingresos = recuperarInt("txtIngresos");
    let egresos = recuperarInt("txtEgresos");
  

  //objeto cliente
  let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  }

  clientes.push(cliente);
  pintarClientes();
}


  pintarClientes = function(){
    let cmpTabla = document.getElementById("tablaClientes");
    let elementoCliente;
    let contenidoTabla = "";
    for(i=0; i<clientes.length; i++){
        elementoCliente = clientes[i];
        contenidoTabla += "<tr><td>"+elementoCliente.cedula+"</td>"+
        "<td>"+elementoCliente.nombre+"</td>"+
        "<td>"+elementoCliente.apellido+"</td>"+
        "<td>"+elementoCliente.ingresos+"</td>"+
        "<td>"+elementoCliente.egresos+"</td>"+

        "<td><button onclick='seleccionarCliente(\""+ elementoCliente.cedula + "\")'>Actualizar</button>" +
        "</tr>"
    }
    cmpTabla.innerHTML = contenidoTabla;
  }

 
 


