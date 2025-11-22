import { useQuery } from "@tanstack/react-query"
import { getReporteOcupacion } from "../../actions/reserva.actions"

export const useReporteOcupacion = (anio: number) => {
    return useQuery({
        queryKey: ['ocupacion', anio],
        queryFn: () => getReporteOcupacion(anio),
        staleTime: 1000 * 60 * 60,
        enabled: !!anio
    })
}