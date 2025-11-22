import { HiOutlinePencil } from 'react-icons/hi2';
import { MdDeleteOutline } from 'react-icons/md';
import { useReservaStore } from '../../../store/reserva.store';
import { useMutateReserva } from '../../../hooks/reserva/useMutateReserva';
import { useRolAuth } from '../../../hooks/auth/useRolAuth';
import { CgClose } from 'react-icons/cg';
import Swal from 'sweetalert2';
import { calcularDias, reordenarFecha } from '../../../helpers/formatearFecha';

export const DetallesReserva = () => {
  const { reservaSeleccionado, closeDetalle, openModal } = useReservaStore();
  const { data: user } = useRolAuth();

  const { id, checkin, checkout, importe, observaciones, habitacion, cliente } = reservaSeleccionado!;
  const { removeReserva } = useMutateReserva();

  const { mutateAsync, isPending } = removeReserva;

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: `Quiere eliminar reserva de ${cliente?.nombre}`,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    });

    if (isConfirmed && id) {
      await mutateAsync(id);
      closeDetalle();
    }
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
      <div className="bg-white rounded-lg shadow-lg w-2xl h-min-[50vh] p-8 text-black">
        <div>
          <div className="flex flex-col justify-between items-center">
            <div className="w-full">
              <div className="flex justify-between w-full mb-10">
                <h3 className="text-xl font-semibold">Detalles Reserva</h3>
                <CgClose size={20} className="cursor-pointer hover:bg-gray-300 rounded-lg" onClick={handleCancel} />
              </div>
            </div>

            <div className="flex gap-4 items-center justify-between w-full mb-5">
              <span className="text-gray-500">Informacion de la reserva actual</span>
            </div>
          </div>

          {/* Informacion de la reserva */}
          <div className="border-gray-200 justify-around py-5 border rounded-lg flex gap-5 items-center">
            <div className="w-15 h-15 rounded-lg flex justify-center items-center text-white" style={{ backgroundColor: '#3e3e3e' }}>
              {cliente?.nombre[0]}
              {cliente?.nombre.split(' ', 2)[1][0]}
            </div>

            <div>
              <p>{cliente?.nombre}</p>
              <span className="text-gray-500">
                {habitacion?.nombre} - {habitacion?.tipo}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Importe Total</p>
              <p className="font-semibold">${importe * calcularDias(checkin, checkout)}</p>
            </div>
          </div>

          {/* Checkin y checkout */}
          <div className="justify-around flex mt-5">
            <div>
              <p className="text-gray-500">Check-In</p>
              <p className="font-semibold">{reordenarFecha(checkin)}</p>
            </div>

            <div>
              <p className="text-gray-500">Check-Out</p>
              <p className="font-semibold">{reordenarFecha(checkout)}</p>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-gray-500">Observaciones</p>
            <p className="text-slate-900 text-md capitalize">{observaciones ?? 'Sin observaciones'}</p>
          </div>

          <div className="flex gap-3 justify-center mt-5 border-t pt-5 border-gray-300">
            <button onClick={handleUpdate} className="w-full justify-center flex gap-2 items-center bg-blue-500 p-2 text-white rounded-lg cursor-pointer hover:bg-blue-400">
              <HiOutlinePencil size={20} className="cursor-pointer hover:bg-gray-200 rounded-lg" />
              Editar
            </button>
            {isPending ? (
              <span className="text-red-500 text-sm">Eliminando...</span>
            ) : (
              user &&
              user.rol === 'admin' && (
                <button onClick={handleDelete} className=" w-full justify-center flex gap-2 items-center bg-red-500 p-2 text-white rounded-lg cursor-pointer hover:bg-red-400">
                  <MdDeleteOutline className="cursor-pointer hover:bg-red-200 rounded-lg" color="white" size={20} />
                  Eliminar
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
