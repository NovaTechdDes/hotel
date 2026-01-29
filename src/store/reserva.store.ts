import { create } from 'zustand';
import type { Reserva } from '../interface/Reserva';

interface ReservaState {
  reservaSeleccionado: Reserva | null;
  fechaSeleccionada: string | null;
  habitacionSeleccionada: string | null;
  isModalOpen: boolean;
  isDetalleOpen: boolean;

  mesSeleccionado: number;
  anioSeleccionado: number;

  setMesSeleccionado: (mes: number) => void;

  openModal: (reserva?: Reserva | string, habitacion?: string) => void;
  openDetalle: (reserva?: Reserva) => void;

  closeDetalle: () => void;
  closeModal: () => void;
}

export const useReservaStore = create<ReservaState>((set) => ({
  reservaSeleccionado: null,
  fechaSeleccionada: '',
  habitacionSeleccionada: '',

  isModalOpen: false,
  isDetalleOpen: false,

  mesSeleccionado: new Date().getMonth(),
  anioSeleccionado: new Date().getFullYear(),

  setMesSeleccionado: (mes) =>
    set((state) => {
      if (state.mesSeleccionado === 11 && mes === 12) {
        return {
          mesSeleccionado: 0,
          anioSeleccionado: state.anioSeleccionado + 1,
        };
      } else if (mes < 0) {
        return {
          mesSeleccionado: 11,
          anioSeleccionado: state.anioSeleccionado - 1,
        };
      } else {
        return {
          mesSeleccionado: mes,
          anioSeleccionado: state.anioSeleccionado,
        };
      }
    }),

  openModal: (reserva, habitacion) =>
    set({
      reservaSeleccionado: typeof reserva === 'string' ? null : reserva,
      fechaSeleccionada: typeof reserva === 'string' ? reserva : '',
      habitacionSeleccionada: habitacion,
      isModalOpen: true,
    }),
  openDetalle: (reserva) =>
    set({
      reservaSeleccionado: reserva,
      isDetalleOpen: true,
    }),
  closeDetalle: () =>
    set({
      reservaSeleccionado: null,
      fechaSeleccionada: null,
      isDetalleOpen: false,
    }),
  closeModal: () =>
    set({
      reservaSeleccionado: null,
      isModalOpen: false,
    }),
}));
