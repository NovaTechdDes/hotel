import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteEgreso, postEgreso, updateEgreso } from "../../actions/egreso.actions"
import type { Egreso } from "../../interface/Egreso";


export const useMutateEgreso = () => {
    const queryClient = useQueryClient();

    const addEgreso = useMutation({
        mutationFn: (egreso: Omit<Egreso, 'id' | 'creado_en'>) => postEgreso(egreso),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['egresos'] });
            queryClient.invalidateQueries({ queryKey: ['egresoPorTipo'] });
            queryClient.invalidateQueries({ queryKey: ['totalegresos'] });
        }
    });

    const removeEgreso = useMutation({
        mutationFn: (id: number) => deleteEgreso(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['egresos'] });
            queryClient.invalidateQueries({ queryKey: ['egresoPorTipo'] });
            queryClient.invalidateQueries({ queryKey: ['totalegresos'] });
        }
    });

    const putEgreso = useMutation({
        mutationFn: (updates: Egreso) => updateEgreso(updates.id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['egresos'] });
            queryClient.invalidateQueries({ queryKey: ['egresoPorTipo'] });
            queryClient.invalidateQueries({ queryKey: ['totalegresos'] });
        }
    });

    return {
        addEgreso,
        removeEgreso,
        putEgreso
    }
}
