import { create } from "zustand";
import type { Reserva } from "../interface/Reserva";

interface ReservaState {
    reservaSeleccionado: Reserva | null;
    fechaSeleccionada: string | null;
    isModalOpen: boolean;
    isDetalleOpen: boolean;

    openModal: (reserva?: Reserva | string) => void;
    openDetalle: (reserva?: Reserva) => void;
    closeDetalle: () => void;
    closeModal: () => void;
};


export const useReservaStore = create<ReservaState>((set) => ({

    reservaSeleccionado: null,
    fechaSeleccionada: '',
    isModalOpen: false,
    isDetalleOpen: false,

    openModal: (reserva) => set({
        reservaSeleccionado: typeof reserva === 'string' ? null : reserva,
        fechaSeleccionada: typeof reserva === 'string' ? reserva : '',
        isModalOpen: true
    }),
    openDetalle: (reserva) => set({
        reservaSeleccionado: reserva,
        isDetalleOpen: true
    }),
    closeDetalle: () => set({
        reservaSeleccionado: null,
        fechaSeleccionada: null,
        isDetalleOpen: false
    }),
    closeModal: () => set({
        reservaSeleccionado: null,
        isModalOpen: false
    })
}));