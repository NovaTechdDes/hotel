import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Precio } from "../../interface/Precio";
import { updatePrecio } from "../../actions/precio.actions";

export const useMutatePrecio = () => {
    const queryClient = useQueryClient();

    const putPrecio = useMutation({
        mutationFn: (precio: Precio) => updatePrecio(precio),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['precio'] })
    });

    return {
        putPrecio
    }
}