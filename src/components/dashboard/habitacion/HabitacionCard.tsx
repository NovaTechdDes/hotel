import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import type { Habitacion } from "../../../interface/Habitacion"
import { MdDeleteOutline } from "react-icons/md";
import { useMutateHabitacion } from "../../../hooks/habitacion/useMutateHabitacion";
import Swal from "sweetalert2";
import { useHabitacionStore } from "../../../store";
import { useRolAuth } from "../../../hooks/auth/useRolAuth";

interface Props {
    habitacion: Habitacion,
};

const HabitacionCard = ({ habitacion }: Props) => {
    const { id, capacidad, nombre, tipo } = habitacion;
    const { openModal } = useHabitacionStore()
    const { data: user } = useRolAuth();

    const { removeHabitacion } = useMutateHabitacion();
    const { mutateAsync } = removeHabitacion;

    const [loading, setLoading] = useState<boolean>(false)


    const handleDeleteHabitacion = async () => {
        setLoading(true);
        const { isConfirmed } = await Swal.fire({
            text: `Quiere eliminar la habitacion ${nombre}`,
            confirmButtonText: 'Aceptar',
            showCancelButton: true
        });

        if (isConfirmed && id) {
            const result = await mutateAsync(id);
            console.log(result)
        };
        setLoading(false);
    };

    const handleUpdate = () => {
        openModal(habitacion)
    };


    return (
        <tr
            className={`text-center border border-gray-300 text-lg transition-all duration-200 ${loading ? "bg-gray-300/70 opacity-70" : ""}`}
        >
            <td>{nombre[0].toUpperCase() + nombre.slice(1)}</td>
            <td>{tipo[0].toUpperCase() + tipo.slice(1)}</td>
            <td>{capacidad.toFixed(2)}</td>
            <td>
                <div className='flex items-center gap-2 justify-center min-h-[24px]'>
                    {loading ? (
                        <span className="flex items-center gap-1 text-gray-500">
                            <span className="w-4 h-4 border-2 border-gray-400 border-t-black rounded-full animate-spin"></span>
                            <span className="text-xs">Cargando...</span>
                        </span>
                    ) : (
                        <>
                            <BiPencil size={20} className='cursor-pointer hover:bg-gray-300 rounded-lg' onClick={handleUpdate} />
                            {user && user?.rol === 'admin' && (<MdDeleteOutline className='text-red-500 cursor-pointer hover:bg-red-300 rounded-lg' size={20} onClick={handleDeleteHabitacion} />)}
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
}

export default HabitacionCard