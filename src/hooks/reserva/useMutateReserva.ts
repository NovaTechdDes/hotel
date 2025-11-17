import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReserva, postReserva, updateReserva } from "../../actions/reserva.actions";
import type { Reserva } from "../../interface/Reserva";

export const useMutateReserva = () => {
    const queryClient = useQueryClient();

    const addReserva = useMutation({
        mutationFn: (reserva: Omit<Reserva, 'id' | 'creado_en'>) => postReserva(reserva),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reservas'] })
    });

    const removeReserva = useMutation({
        mutationFn: (id: string) => deleteReserva(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reservas'] })
    });

    const putReserva = useMutation({
        mutationFn: (reserva: Reserva) => updateReserva(reserva),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reservas'] })
    });

    return {
        addReserva,
        removeReserva,
        putReserva
    };
};