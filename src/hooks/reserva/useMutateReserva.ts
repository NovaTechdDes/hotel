import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteReserva, postReserva, updateReserva } from '../../actions/reserva.actions';
import type { Reserva } from '../../interface/Reserva';

export const useMutateReserva = () => {
  const queryClient = useQueryClient();

  const addReserva = useMutation({
    mutationFn: (reserva: Omit<Reserva, 'id' | 'creado_en'>) => postReserva(reserva),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      queryClient.invalidateQueries({ queryKey: ['temporada-baja'] });
      queryClient.invalidateQueries({ queryKey: ['reporte'] });
      queryClient.invalidateQueries({ queryKey: ['ocupacion'] });
    },
  });

  const removeReserva = useMutation({
    mutationFn: (id: string) => deleteReserva(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      queryClient.invalidateQueries({ queryKey: ['temporada-baja'] });
      queryClient.invalidateQueries({ queryKey: ['reporte'] });
      queryClient.invalidateQueries({ queryKey: ['ocupacion'] });
    },
  });

  const putReserva = useMutation({
    mutationFn: (reserva: Reserva) => updateReserva(reserva),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] });
      queryClient.invalidateQueries({ queryKey: ['temporada-baja'] });
      queryClient.invalidateQueries({ queryKey: ['reporte'] });
      queryClient.invalidateQueries({ queryKey: ['ocupacion'] });
    },
  });

  return {
    addReserva,
    removeReserva,
    putReserva,
  };
};
