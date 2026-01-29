import { useQuery } from '@tanstack/react-query';
import { getReservas } from '../../actions/reserva.actions';

export const useReservas = (month: number, anio: number) => {
  return useQuery({
    queryKey: ['reservas', month, anio],
    queryFn: () => getReservas(month, anio),
    staleTime: 1000 * 60 * 60,
  });
};
