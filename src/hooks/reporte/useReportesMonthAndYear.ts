import { useQuery } from "@tanstack/react-query"
import { getReservasMonth } from "../../actions/reserva.actions"

export const useReportesMonthAndYear = (mes: number, anio: number) => {
    return useQuery({
        queryKey: ['reporte', mes, anio],
        queryFn: () => getReservasMonth(mes, anio),
        staleTime: 1000 * 60 * 60,
        enabled: !!mes && !!anio,
    })
}