import { useQuery } from '@tanstack/react-query';
import { getCaracteristicas } from '../../actions/caracteristica.actions';

export const useCaracteristicas = () => {
  return useQuery({
    queryKey: ['caracteristicas'],
    queryFn: () => getCaracteristicas(),
    staleTime: 60 * 60 * 1000,
  });
};
