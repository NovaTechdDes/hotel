import type { Cliente } from "./Cliente";
import type { Habitacion } from "./Habitacion";

export interface Reserva {
    id?: string;
    idcliente: string;
    checkin: string;
    checkout: string;
    importe: number;
    habitacionid: string;
    color: string;
    cant_personas: number;

    creado_en?: Date;
    usuarioid?: string;
    cliente?: Cliente;
    habitacion?: Habitacion;
}