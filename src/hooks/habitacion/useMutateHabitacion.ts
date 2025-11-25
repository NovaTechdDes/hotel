import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Habitacion } from '../../interface/Habitacion';
import { deleteHabitacion, postHabitacion, updateHabitacion } from '../../actions/habitacion.actions';

export const useMutateHabitacion = () => {
  const queryClient = useQueryClient();

  const addHabitacion = useMutation({
    mutationFn: ({ habitacion, listadoCaracteristicas }: { habitacion: Omit<Habitacion, 'id' | 'creado_en'>; listadoCaracteristicas: string[] }) => postHabitacion(habitacion, listadoCaracteristicas),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habitaciones'] }),
  });

  const removeHabitacion = useMutation({
    mutationFn: (id: string) => deleteHabitacion(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habitaciones'] }),
  });

  const putHabitacion = useMutation({
    mutationFn: (habitacion: Habitacion) => updateHabitacion(habitacion),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habitaciones'] }),
  });

  return {
    addHabitacion,
    removeHabitacion,
    putHabitacion,
  };
};
