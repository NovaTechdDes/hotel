import { useQuery } from "@tanstack/react-query"
import { getHabitaciones } from "../../actions/habitacion.actions"

export const useHabitaciones = () => {
    return useQuery({
        queryKey: ['habitaciones'],
        queryFn: getHabitaciones,
        staleTime: 1000 * 60 * 60
    });
};
