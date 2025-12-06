import type { Cliente } from './Cliente';
import type { Habitacion } from './Habitacion';

export interface Reserva {
  id?: string;
  idcliente: string | null;
  checkin: string;
  checkout: string;
  importe: number;
  habitacionid: string;
  color: string;
  cant_personas: number;
  cliente_nombre: string;
  cliente_dni: string;
  cliente_telefono: string;
  observaciones: string;
  nro_reserva?: number;
  mostrar: boolean;

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
