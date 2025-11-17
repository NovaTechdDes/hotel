import type { TipoEgreso } from "./TipoEgreso";


export interface Egreso {
    id?: number;
    importe: number;
    descripcion: string;
    tipoegresoid: string;
    tipoEgreso?: TipoEgreso;
    usuarioid?: number;
    creado_en?: string;
}