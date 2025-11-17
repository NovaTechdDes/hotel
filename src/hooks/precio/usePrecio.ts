import { useQuery } from "@tanstack/react-query"
import { getPrecio } from "../../actions/precio.actions"

export const usePrecio = () => {
    return useQuery({
        queryKey: ['precio'],
        queryFn: getPrecio,
        staleTime: 1000 * 60 * 60
    })
};