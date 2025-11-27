export const formatearNumero = (numero: string) => {
  if (numero[0] === '$') {
    const numeroFormateado = new Intl.NumberFormat('es-AR').format(Number(numero.slice(1)));
    return '$' + numeroFormateado;
  } else {
    const numeroFormateado = new Intl.NumberFormat('es-AR').format(Number(numero));
    return numeroFormateado;
  }
};
