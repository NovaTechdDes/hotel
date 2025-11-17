import { useQuery } from "@tanstack/react-query"
import { getclientes } from "../../actions/cliente.actions"

export const useClientes = () => {
    return useQuery({
        queryKey: ['clientes'],
        queryFn: getclientes,
        staleTime: 1000 * 60 * 60
    });
};