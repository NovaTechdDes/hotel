import Swal from 'sweetalert2';

export const verError = async (codigo: string | undefined, msg: string) => {
  if (codigo === '23503') {
    await Swal.fire(msg, '', 'error');
  } else {
    await Swal.fire('Error', 'No se pudo realizar la operacion', 'error');
  }
  return false;
};
