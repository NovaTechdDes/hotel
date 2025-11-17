import { create } from "zustand";
import type { Habitacion } from "../interface/Habitacion";

interface HabitacionState {
    habitacionSeleccionado: Habitacion | null;
    isModalOpen: boolean;

    openModal: (habitacion?: Habitacion) => void;
    closeModal: () => void;
};

export const useHabitacionStore = create<HabitacionState>((set) => ({
    habitacionSeleccionado: null,
    isModalOpen: false,

    openModal: (habitacion) => set({
        habitacionSeleccionado: habitacion,
        isModalOpen: true
    }),
    closeModal: () => set({
        habitacionSeleccionado: null,
        isModalOpen: false
    }),
}))