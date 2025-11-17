import Swal from "sweetalert2"

export const verError = async (codigo: string | undefined, message: string | undefined) => {
    if (codigo === "23503") {
        await Swal.fire('No se puede eliminar el tipo de egreso porque contiene egresos con este tipo', '', 'error')
    } else {
        await Swal.fire('Error al eliminar el tipo de egreso', message, 'error')
    };
    return false
};