import type { Egreso } from "../interface/Egreso";

interface EgresoState {
    egresoSeleccionado: Egreso | null;
    isModalOpen: boolean;

    openModal: (egreso?: Egreso) => void;
    closeModal: () => void;
};


import { create } from "zustand";

export const useEgresoStore = create<EgresoState>((set) => ({
    egresoSeleccionado: null,
    isModalOpen: false,

    openModal: (egreso) => set({
        egresoSeleccionado: egreso,
        isModalOpen: true
    }),
    closeModal: () => set({
        egresoSeleccionado: null,
        isModalOpen: false
    })
}));
