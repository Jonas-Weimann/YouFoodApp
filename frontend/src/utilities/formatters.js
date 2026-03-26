export const formatearMoneda = (monto) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    }).format(monto)
}

export const formatearFecha = (fecha) => {
  if (!fecha) return "-";

  if (typeof fecha === 'string') {
    const parteFecha = fecha.split('T')[0]; 
    const [year, month, day] = parteFecha.split('-');
    return `${parseInt(day)}/${parseInt(month)}/${year}`;
  }

  return new Intl.DateTimeFormat('es-AR').format(fecha);
};

export const capitalizar = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}

export const parsearFechaLocal = (fechaStr) => {
  if (!fechaStr) return new Date();
  const [year, month, day] = fechaStr.split('T')[0].split('-').map(Number);
  return new Date(year, month - 1, day); 
};