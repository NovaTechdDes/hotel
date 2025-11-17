import { useQuery } from "@tanstack/react-query"
import { getTotalEgresos } from "../../actions/egreso.actions"

export const useEgresoImporteTotal = () => {
    return useQuery({
        queryKey: ['totalegresos'],
        queryFn: getTotalEgresos,
        staleTime: 1000 * 60 * 60
    })
}