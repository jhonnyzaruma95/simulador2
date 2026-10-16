function calcularDisponible(ingresos, egresos){
    let montoDisponible = ingresos - egresos;
    if (montoDisponible < 0){
        return 0;
    }
    return montoDisponible;
}

function calcularCapacidadPago(montoDisponible){
    const capacidadPago = montoDisponible * 0.30;
    return capacidadPago;
}

function calcularInteresSimple(monto, tasa, plazoAnios){
    let tasaDecimal = tasa / 100;
    let interes = monto * tasaDecimal * plazoAnios;
    return interes;
}

function calcularTotalPagar(monto, interes){
    let subtotal = monto + interes;
    let totalPagar = subtotal + 100;
    return totalPagar;
}

function calcularCuotaMensual(totalPagar, plazoAnios){
    const meses = plazoAnios * 12;
    const cuotaMensual = totalPagar / meses;
    return cuotaMensual;
}

function aprobarCredito(capacidadPago, cuotaMensual){
    if (capacidadPago > cuotaMensual){
        return true;   //Aprobado
    }else {
        return false;  //Rechazado
    }
}