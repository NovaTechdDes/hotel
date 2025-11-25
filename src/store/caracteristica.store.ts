import { create } from 'zustand';
import type { Caracteristica } from '../interface';

interface CaracteristicaStore {
  caracteristicaSeleccionada: Caracteristica | null;

  isModalOpen: boolean;
  openModal: (caracterisitca?: Caracteristica) => void;
  closeModal: () => void;
}

export const useCaracteristicaStore = create<CaracteristicaStore>()((set) => ({
  caracteristicaSeleccionada: null,
  isModalOpen: false,
  openModal: (caracterisitca?: Caracteristica) =>
    set({
      isModalOpen: true,
      caracteristicaSeleccionada: caracterisitca,
    }),
  closeModal: () => set({ isModalOpen: false }),
}));
