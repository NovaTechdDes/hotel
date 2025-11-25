import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCaracteristica, postCaracteristica } from '../../actions/caracteristica.actions';

export const useMutateCaracteristicas = () => {
  const queryClient = useQueryClient();

  const addCaracteristica = useMutation({
    mutationFn: postCaracteristica,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caracteristicas'] });
    },
  });

  const putCaracteristica = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caracteristicas'] });
    },
  });

  const eliminarCaracteristica = useMutation({
    mutationFn: deleteCaracteristica,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['caracteristicas'] });
    },
  });

  return {
    addCaracteristica,
    putCaracteristica,
    eliminarCaracteristica,
  };
};
