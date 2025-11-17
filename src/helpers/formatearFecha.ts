
export const formatearAString = (date: Date) => {
    const fecha = new Date(date);

    const offset = fecha.getTimezoneOffset() * 60 * 1000;
    const fechaAjustada = new Date(fecha.getTime() - offset);
    return fechaAjustada.toISOString();
}