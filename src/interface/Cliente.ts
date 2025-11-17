export interface Cliente {
    id?: string;
    nombre: string;
    telefono: string;
    dni: string;
    domicilio: string;
    localidad: string;
    creado_en?: Date
}