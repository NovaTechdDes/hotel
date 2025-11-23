import { useQuery } from "@tanstack/react-query"
import { getReporteTemporadaBaja } from "../../actions/reserva.actions"

export const useReporteTemporadaBaja = (anio: number) => {
    return useQuery({
        queryKey: ['temporada-baja', anio],
        queryFn: () => getReporteTemporadaBaja(anio),
        staleTime: 1000 * 60 * 60,
        enabled: !!anio
    })
}