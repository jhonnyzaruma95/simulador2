
  let clientes = [];
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

