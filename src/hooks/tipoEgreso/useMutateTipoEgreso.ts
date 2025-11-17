import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTipoEgreso, postTipoEgreso, updateTipoEgreso } from "../../actions/tipoEgreso.actions"
import type { TipoEgreso } from "../../interface/TipoEgreso";



export const useMutateTipoEgreso = () => {
    const queryClient = useQueryClient();

    const addTipoEgreso = useMutation({
        mutationFn: (tipoEgreso: Omit<TipoEgreso, 'id' | 'creado_en'>) => postTipoEgreso(tipoEgreso),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tipoEgreso'] })
    });

    const removeTipoEgreso = useMutation({
        mutationFn: (id: number) => deleteTipoEgreso(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tipoEgreso'] })
    });

    const putTipoEgreso = useMutation({
        mutationFn: (updates: TipoEgreso) => updateTipoEgreso(updates.id as number, updates),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tipoEgreso'] })
    });

    return {
        addTipoEgreso,
        removeTipoEgreso,
        putTipoEgreso
    }
}
