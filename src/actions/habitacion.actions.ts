import Swal from 'sweetalert2';
import type { Habitacion } from '../interface/Habitacion';
import { supabase } from '../lib/supababase';

export const getHabitaciones = async (): Promise<Habitacion[]> => {
  const { data, error } = await supabase.from('habitacion').select(`*, caracteristica_habitacion (caracteristicaid)`).order('id');

  if (error) await Swal.fire('Error al obtener las habitaciones', error.message, 'error');

  return data as Habitacion[];
};

export const getHabitacionById = async (id: number): Promise<Habitacion | null> => {
  const { data, error } = await supabase.from('habitacion').select('*').eq('id', id).single();
  if (error) await Swal.fire('Error al obtener la habitacion', error.message, 'error');

  return data as Habitacion;
};

export const postHabitacion = async (habitacion: Omit<Habitacion, 'id' | 'creado_en'>, listadoCaracteristicas: string[]): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('habitacion').insert(habitacion).select().single<Habitacion>();
    if (error) {
      await Swal.fire('Error al cargar la habitacion', error.message, 'error');
      return false;
    }

    //Si se cargo la habitacin vemos de cargar las caracterisitcas de la habitacion con la del id que devolvimos
    if (listadoCaracteristicas.length !== 0) {
      for (const elem of listadoCaracteristicas) {
        const { error } = await supabase.from('caracteristica_habitacion').insert({ habitacionid: data?.id, caracteristicaid: elem });

        if (error) {
          await Swal.fire('Error al cargar la habitacion', error.message, 'error');
          return false;
        }
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateHabitacion = async (updates: Partial<Habitacion>): Promise<boolean> => {
  try {
    const { id, creado_en, caracteristica_habitacion, ...dataUpdate } = updates;
    const { data, error } = await supabase.from('habitacion').update(dataUpdate).eq('id', id);
    if (error) {
      await Swal.fire('Error al modificar la habitacion', error.message, 'error');
      return false;
    }
    console.log(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteHabitacion = async (id: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('habitacion').delete().eq('id', id);
    if (error) {
      await Swal.fire('error al eliminar la habitacion', error.message, 'error');
      return false;
    }
    console.log(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
