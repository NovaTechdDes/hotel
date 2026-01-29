import { useQuery } from '@tanstack/react-query';
import { getReservas } from '../../actions/reserva.actions';

export const useReservas = (month: number, anio: number, todo: boolean = false) => {
  return useQuery({
    queryKey: ['reservas', month, anio, todo],
    queryFn: () => getReservas(month, anio, todo),
    staleTime: 1000 * 60 * 60,
  });
};
