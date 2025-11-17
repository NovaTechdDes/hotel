import { useQuery } from "@tanstack/react-query"
import { getTipoEgresos } from "../../actions/tipoEgreso.actions"

export const useTipoEgreso = () => {
    return useQuery({
        queryKey: ['tipoEgreso'],
        queryFn: getTipoEgresos,
        staleTime: 1000 * 60 * 60
    });
};
