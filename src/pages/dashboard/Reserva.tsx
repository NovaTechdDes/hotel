import { GoSearch } from 'react-icons/go';
import { useReservas } from '../../hooks/reserva/useReservas';
import { ReservaCard } from '../../components/dashboard/reserva/ReservaCard';
import { DetallesReserva, Loading, ModalCalendario } from '../../components';
import { useReservaStore } from '../../store/reserva.store';
import { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { nombreMes } from '../../helpers/nombreMes';

export const Reserva = () => {
  const { isDetalleOpen, isModalOpen, mesSeleccionado, anioSeleccionado, setMesSeleccionado } = useReservaStore();
  const { data: reservas, isLoading } = useReservas(mesSeleccionado, anioSeleccionado, true);

  const handlePreviusMonth = () => {
    setMesSeleccionado(mesSeleccionado - 1);
  };

  const handleNextMonth = () => {
    setMesSeleccionado(mesSeleccionado + 1);
  };

  const [buscador, setBuscador] = useState('');

  return (
    <div className="text-black md:mx-10 mx-2 py-5 flex flex-col gap-5 h-full">
      <div className="bg-white rounded-lg flex justify-between p-5 border border-gray-300 dark:bg-slate-800 dark:border-gray-600">
        <div>
          <h3 className="text-2xl font-semibold dark:text-white">Reservas</h3>
          <span className="text-gray-500 dark:text-gray-400">Gestiona y visualiza todas las reservas del hotel</span>
        </div>

        <div className="flex gap-2 py-2 mx-5 items-center text-black font-bold">
          <div onClick={handlePreviusMonth} className=" p-1 hover:bg-green-300 border border-gray-300 rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700">
            <MdKeyboardArrowLeft size={20} className="dark:text-white" />
          </div>
          <p className="text-xs dark:text-white">
            {nombreMes(mesSeleccionado).toUpperCase().slice(0, 3)} {anioSeleccionado}
          </p>
          <div onClick={handleNextMonth} className=" p-1 hover:bg-green-300 border border-gray-300 rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700">
            <MdKeyboardArrowRight size={20} className="dark:text-white" />
          </div>
        </div>
      </div>

      <div className="p-5 bg-white rounded-lg border border-gray-300 dark:bg-slate-800 dark:border-gray-600">
        <div className="relative w-full">
          <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="buscador"
            id="buscador"
            value={buscador}
            onChange={(e) => setBuscador(e.target.value)}
            placeholder="Buscar por nombre de cliente o habitacion"
            className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 dark:text-white dark:placeholder:text-gray-400 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="p-5 bg-white rounded-lg border border-gray-300 dark:bg-slate-800 dark:border-gray-600 overflow-y-auto h-full">
        {isLoading ? <Loading text="Cargando reservas" /> : reservas?.map((reserva) => <ReservaCard buscador={buscador} reserva={reserva} key={reserva.id} />)}
      </div>

      {isDetalleOpen && <DetallesReserva />}
      {isModalOpen && <ModalCalendario />}
    </div>
  );
};
