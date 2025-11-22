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
    observaciones: string;

    creado_en?: Date;
    usuarioid?: string;
    cliente?: Cliente;
    habitacion?: Habitacion;
}



export interface TemporadaAlta {
    total_reservas: number;
    total_dias_ocupados: number;
    porcentaje_ocupacion: number;
}