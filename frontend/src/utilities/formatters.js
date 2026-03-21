export const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    }).format(monto)
}

export const formatearFecha = (fecha) => {
    return new Intl.DateTimeFormat('es-AR')
    .format(new Date(fecha))
}

export const capitalizar = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}