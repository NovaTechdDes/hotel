import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCliente, postCliente, updateCliente } from "../../actions/cliente.actions"
import type { Cliente } from "../../interface/Cliente";

export const useMutateCliente = () => {
    const queryClient = useQueryClient();

    const addCliente = useMutation({
        mutationFn: (cliente: Omit<Cliente, 'id' | 'creado_en'>) => postCliente(cliente),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clientes'] })
    })

    const removeCliente = useMutation({
        mutationFn: (id: string) => deleteCliente(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clientes'] })
    })

    const putCliente = useMutation({
        mutationFn: (updates: Cliente) => updateCliente(updates.id, updates),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clientes'] })
    })


    return {

        //metodos
        addCliente,
        removeCliente,
        putCliente
    }
}