import { useQuery } from "@tanstack/react-query";
import { getHabitacionById } from "../../actions/habitacion.actions";

export const useHabitacionId = (id: number) => {
    return useQuery({
        queryKey: ['habitacion', id],
        queryFn: () => getHabitacionById(id),
    });
};