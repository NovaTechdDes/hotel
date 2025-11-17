import { GoSearch } from "react-icons/go"
import { useReservas } from "../../hooks/reserva/useReservas"
import { ReservaCard } from "../../components/dashboard/reserva/ReservaCard";
import { DetallesReserva, Loading, ModalCalendario } from "../../components";
import { useReservaStore } from "../../store/reserva.store";
import { useState } from "react";

export const Reserva = () => {

    const { data: reservas, isLoading } = useReservas();
    const { isDetalleOpen, isModalOpen } = useReservaStore();

    const [buscador, setBuscador] = useState('');


    return (

        <div className="text-black mx-10 my-5 flex flex-col gap-5 ">

            <div className="bg-white rounded-lg p-5 border border-gray-300">
                <h3 className="text-2xl font-semibold">Reservas</h3>
                <span className="text-gray-500">Gestiona y visualiza todas las reservas del hotel</span>
            </div>


            <div className="TODO TARJETAS">

            </div>


            <div className="p-5 bg-white rounded-lg border border-gray-300" >
                <div className="relative w-full">
                    <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        name="buscador"
                        id="buscador"
                        value={buscador}
                        onChange={(e) => setBuscador(e.target.value)}
                        placeholder="Buscar por nombre de cliente o habitacion"
                        className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
            </div>

            <div className="p-5 bg-white rounded-lg border border-gray-300">
                {
                    isLoading ? <Loading text="Cargando reservas" /> : (
                        reservas?.map(reserva => (
                            <ReservaCard buscador={buscador} reserva={reserva} key={reserva.id} />
                        ))
                    )
                }
            </div>

            {isDetalleOpen && <DetallesReserva />}
            {isModalOpen && <ModalCalendario />}


        </div>
    )
}
