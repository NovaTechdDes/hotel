import { useQuery } from "@tanstack/react-query"
import { getEgresoPorTipo } from "../../actions/egreso.actions"

export const useEgresoPorTipo = () => {
    return useQuery({
        queryKey: ['egresoPorTipo'],
        queryFn: getEgresoPorTipo,
        staleTime: 1000 * 60 * 60
    })
}