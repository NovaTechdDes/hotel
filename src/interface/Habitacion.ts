export interface Habitacion {
  id?: string;
  nombre: string;
  tipo: string;
  capacidad: number;
  creado_en: Date;
  descripcion: string;
  disponible?: boolean;
  observaciones?: string;
  caracteristica_habitacion: string[];
}
