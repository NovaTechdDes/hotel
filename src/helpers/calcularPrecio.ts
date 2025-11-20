import type { Precio } from "../interface";

export const calcularPrecios = (precio: Precio, cantPersonas: number): number => {

    if(cantPersonas === 1){
        return Number((precio.base / precio.division).toFixed(2))
    };

    if(cantPersonas === 2){
        return Number((precio.base).toFixed(2))
    };

    if(cantPersonas > 2){
        return Number((precio.base + precio.aumento * (cantPersonas - 2)).toFixed(2))
    };



    return 1;
};