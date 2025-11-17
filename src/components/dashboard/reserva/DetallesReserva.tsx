
import { format } from "date-fns"
import { HiOutlinePencil } from "react-icons/hi2"
import { MdDeleteOutline } from "react-icons/md";
import { useReservaStore } from "../../../store/reserva.store";
import Swal from "sweetalert2";
import { useMutateReserva } from "../../../hooks/reserva/useMutateReserva";
import { useRolAuth } from "../../../hooks/auth/useRolAuth";
import { CgClose } from "react-icons/cg";


export const DetallesReserva = () => {
    const { reservaSeleccionado, closeDetalle, openModal, } = useReservaStore();
    const { data: user } = useRolAuth();

    const { id } = reservaSeleccionado!;

    const { checkin, checkout, habitacion, cliente } = reservaSeleccionado!;
    const { removeReserva } = useMutateReserva();

    const { mutateAsync, isPending } = removeReserva


    const handleDelete = async () => {

        const { isConfirmed } = await Swal.fire({
            title: `Quiere eliminar reserva de ${cliente?.nombre}`,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
        });

        if (isConfirmed && id) {
            await mutateAsync(id);
            closeDetalle();
        };

    };

    const handleUpdate = () => {

        if (!reservaSeleccionado) return;
        closeDetalle();
        openModal(reservaSeleccionado);
    };

    const handleCancel = () => {
        closeDetalle();
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-white rounded-lg shadow-lg w-2xl h-[50vh] p-8 text-black">
                <div>

                    <div className="flex justify-between items-center">
                        <div className="w-full">
                            <div className="flex justify-between w-full mb-10">
                                <h3 className="text-xl font-semibold">Detalles Reserva</h3>
                                <CgClose size={20} className="cursor-pointer hover:bg-gray-300 rounded-lg" onClick={handleCancel} />
                            </div>
                            <span className="text-gray-500">Informacion de la reserva actual</span>
                        </div>

                        <div className="flex gap-4 items-center">
                            <HiOutlinePencil size={20} className="cursor-pointer hover:bg-gray-200 rounded-lg" onClick={handleUpdate} />
                            {isPending ? (
                                <span className="text-red-500 text-sm">Eliminando...</span>
                            ) : (
                                user && user.rol === 'admin' && (<MdDeleteOutline onClick={handleDelete} className="cursor-pointer hover:bg-red-200 rounded-lg" color="red" size={20} />)
                            )}
                        </div>
                    </div>


                    <div className="border-gray-200 py-5 border rounded-lg flex gap-5 items-center justify-center">
                        <div className="w-15 h-15 rounded-lg flex justify-center items-center text-white" style={{ backgroundColor: '#3e3e3e' }}>
                            {cliente?.nombre[0]}{cliente?.nombre.split(' ', 2)[1][0]}
                        </div>

                        <div>
                            <p>{cliente?.nombre}</p>
                            <span className="text-gray-500">{habitacion?.nombre} - {habitacion?.tipo}</span>
                        </div>
                    </div>

                    <div className="justify-around flex mt-5">
                        <div>
                            <p className="text-gray-500">Check-In</p>
                            <p className="font-semibold">{format(checkin, 'dd/MM')}</p>
                        </div>

                        <div>
                            <p className="text-gray-500">Check-Out</p>
                            <p className="font-semibold">{format(checkout, 'dd/MM')}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
