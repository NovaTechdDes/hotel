import { useQuery } from "@tanstack/react-query"
import { getReservas } from "../../actions/reserva.actions"

export const useReservas = () => {
    return useQuery({
        queryKey: ['reservas'],
        queryFn: getReservas,
        staleTime: 1000 * 60 * 60
    })
}