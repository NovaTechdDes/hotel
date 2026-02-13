import { create } from 'zustand';

interface CalendarioStore {
  mesSeleccionado: number;
  anioSeleccionado: number;

  setMesSeleccionado: (mes: number) => void;

  modalListaCalendario: boolean;
  setModalListaCalendario: (modalListaCalendario: boolean) => void;
  diaListaCalendario: string;
  setDiaListaCalendario: (diaListaCalendario: string) => void;
}

export const useCalendarioStore = create<CalendarioStore>((set) => ({
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
  modalListaCalendario: false,
  setModalListaCalendario: (modalListaCalendario) =>
    set(() => ({
      modalListaCalendario: modalListaCalendario,
    })),
  diaListaCalendario: '',
  setDiaListaCalendario: (diaListaCalendario) =>
    set(() => ({
      diaListaCalendario: diaListaCalendario,
    })),
}));
