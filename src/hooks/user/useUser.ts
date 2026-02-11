import { useQuery } from '@tanstack/react-query';
import { obtenerUsuarios } from '../../actions/users.actions';

export const useUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: obtenerUsuarios,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
