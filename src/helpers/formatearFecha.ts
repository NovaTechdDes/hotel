export const formatearAString = (date: Date) => {
  const fecha = new Date(date);

  const offset = fecha.getTimezoneOffset() * 60 * 1000;
  const fechaAjustada = new Date(fecha.getTime() - offset);
  return fechaAjustada.toISOString();
};

export const reordenarFecha = (fecha: string) => {
  const fechaFormateada = fecha.slice(0, 10).split('-').reverse().join('/');
  return fechaFormateada;
};

export const calcularDias = (checkin: string, checkout: string) => {
  const fechaCheckin = new Date(checkin);
  const fechaCheckout = new Date(checkout);
  const diffTime = Math.abs(fechaCheckout.getTime() - fechaCheckin.getTime()) + 1;
  const diffDays = diffTime === 0 ? Math.ceil(1 / (1000 * 60 * 60 * 24)) : Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
