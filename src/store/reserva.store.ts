import { create } from "zustand";
import type { Reserva } from "../interface/Reserva";

interface ReservaState {
    reservaSeleccionado: Reserva | null;
    isModalOpen: boolean;
    isDetalleOpen: boolean;

    openModal: (reserva?: Reserva) => void;
    openDetalle: (reserva?: Reserva) => void;
    closeDetalle: () => void;
    closeModal: () => void;
};


export const useReservaStore = create<ReservaState>((set) => ({

    reservaSeleccionado: null,
    isModalOpen: false,
    isDetalleOpen: false,

    openModal: (reserva) => set({
        reservaSeleccionado: reserva,
        isModalOpen: true
    }),
    openDetalle: (reserva) => set({
        reservaSeleccionado: reserva,
        isDetalleOpen: true
    }),
    closeDetalle: () => set({
        reservaSeleccionado: null,
        isDetalleOpen: false
    }),
    closeModal: () => set({
        reservaSeleccionado: null,
        isModalOpen: false
    })
}));