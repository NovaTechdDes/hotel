// CalendarioHotel.tsx
import { addDays, format } from "date-fns";
import { useClientes, useHabitaciones } from "../../hooks";

import { useReservaStore } from "../../store/reserva.store";

import { useReservas } from "../../hooks/reserva/useReservas";

import { formatearAString } from "../../helpers/formatearFecha";
import type { Cliente, Habitacion, Reserva } from "../../interface";
import { DetallesReserva, HeaderCalendario, ModalCalendario } from "../../components";

const start = new Date();
const days = Array.from({ length: 30 }, (_, i) => addDays(start, i));

const devolverReserva = (reservas: Reserva[], day: Date, hab: Habitacion, clientes: Cliente[] = []) => {
    const reserva = reservas?.find(elem => {
        if (elem.checkin.slice(0, 10) <= formatearAString(day).slice(0, 10) &&
            elem.checkout.slice(0, 10) >= formatearAString(day).slice(0, 10) && elem.habitacionid === hab.id) return elem
    });

    if (reserva) {
        return {
            id: reserva.id,
            fondo: `${!reserva?.color ? '#3e3e3e' : reserva.color}`,
            cliente: clientes.find(elem => (elem.id === reserva.idcliente))?.nombre
        }
    } else {
        return {
            id: '',
            fondo: ''
        }
    }
}


export const Calendario = () => {
    const { isModalOpen, openDetalle, openModal } = useReservaStore();
    const { data: reservas } = useReservas();
    const { data: habitaciones } = useHabitaciones();
    const { data: clientes } = useClientes();

    const handleReserva = (e: React.MouseEvent<HTMLTableCellElement>) => {
        const target = e.target as HTMLTableCellElement;
        if (target.id === '') {
            openModal();
        } else {
            openDetalle();
        }
    };

    return (
        <>
            <HeaderCalendario />
            <div className="overflow-x-auto border rounded-md text-black h-[calc(100vh-128px)] bg-white">
                <table className="min-w-max border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2 bg-gray-100 sticky left-0">Habitación</th>
                            {days.map((day) => (
                                <th key={day.toISOString()} className="border p-2 text-sm text-center">
                                    {format(day, "dd/MM")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {habitaciones?.map((hab) => (
                            <tr key={hab.id}>
                                <td className="border p-2 bg-gray-50 sticky left-0">
                                    <div>
                                        <p className="font-semibold">{hab.nombre}</p>
                                        <span className="text-gray-500 text-xs">{hab.tipo}</span>
                                    </div>
                                </td>
                                {days?.map((day) => (
                                    <td
                                        id={devolverReserva(reservas ?? [], day, hab, clientes!).id}
                                        key={day.toISOString()}
                                        onClick={handleReserva}
                                        className={`border h-10 w-20 text-center hover:bg-gray-200 cursor-pointer `}
                                        style={{ backgroundColor: `${devolverReserva(reservas ?? [], day, hab, clientes!).fondo}` }}>
                                        <p className="text-white">{devolverReserva(reservas ?? [], day, hab, clientes!).cliente}</p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {false && <DetallesReserva />}
            {isModalOpen && <ModalCalendario />}
        </>
    );
};
