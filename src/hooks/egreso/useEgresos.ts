import { useQuery } from "@tanstack/react-query"
import { getEgresos } from "../../actions/egreso.actions"

export const useEgresos = () => {
    return useQuery({
        queryKey: ['egresos'],
        queryFn: getEgresos,
        staleTime: 1000 * 60 * 60
    });
};
