import { HiOutlineCalendar, HiOutlinePencilSquare } from "react-icons/hi2"

import { LuBed } from "react-icons/lu";
import { format } from "date-fns";
import type { Reserva } from "../../../interface";
import { useReservaStore } from "../../../store/reserva.store";

interface Props {
    reserva: Reserva;
    buscador: string;
};

export const ReservaCard = ({ buscador, reserva }: Props) => {
    const { cliente, color, habitacion, checkin, checkout } = reserva;
    const { openDetalle } = useReservaStore();

    const handleReserva = () => {
        openDetalle(reserva);
    };

    if (!cliente?.nombre.toUpperCase().startsWith(buscador.toUpperCase()) && !habitacion?.nombre.toUpperCase().startsWith(buscador.toUpperCase())) {
        return
    }

    return (
        <div className="flex gap-5 justify-between mb-5">

            <div className="flex gap-5  ">
                <div className="w-15 h-15 text-white flex items-center justify-center rounded-lg" style={{ backgroundColor: color }}>
                    {cliente?.nombre[0]}{cliente?.nombre.split(' ', 2)[1][0]}
                </div>

                <div>
                    <div className="flex items-center gap-2">
                        <p>{cliente?.nombre}</p>
                        <p className="text-gray-500">{habitacion?.tipo}</p>
                    </div>
                    <p className="flex items-center gap-5">
                        <LuBed />
                        <span className="text-gray-500">Habitacion {habitacion?.nombre}</span>
                    </p>
                </div>
            </div>

            <div className="flex items-end gap-2 justify-center text-gray-500">
                <HiOutlineCalendar size={20} />
                <p>{format(checkin, 'dd/MM')} - {format(checkout, 'dd/MM')}</p>
            </div>

            <button className="inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg px-2" onClick={handleReserva}>
                <HiOutlinePencilSquare />
                Ver Detalles
            </button>

        </div >
    )
}
