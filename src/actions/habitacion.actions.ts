import Swal from 'sweetalert2';
import type { Habitacion } from '../interface/Habitacion';
import { supabase } from '../lib/supababase';

export const getHabitaciones = async (): Promise<Habitacion[]> => {
  const { data, error } = await supabase.from('habitacion').select(`*, caracteristica_habitacion (caracteristicaid)`).order('nombre');

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
    const { caracteristica_habitacion, ...habitacionToInsert } = habitacion;
    console.log(caracteristica_habitacion);

    const { data, error } = await supabase.from('habitacion').insert(habitacionToInsert).select().single<Habitacion>();
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
    console.error(error);
    return false;
  }
};

export const updateHabitacion = async (updates: Partial<Habitacion>): Promise<boolean> => {
  try {
    const { id, creado_en, caracteristica_habitacion, ...dataUpdate } = updates;

    if (!id) return false;

    if (caracteristica_habitacion?.length !== 0) {
      actualizacionDeCaracteristicas(id, caracteristica_habitacion ?? []);
    }

    const { error } = await supabase.from('habitacion').update(dataUpdate).eq('id', id);
    if (error) {
      await Swal.fire('Error al modificar la habitacion', error.message, 'error');
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
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
    console.error(error);
    return false;
  }
};

export const eliminarCaracteristicaHabitacion = async (id: string, caracteristicaid: string) => {
  const { error } = await supabase.from('caracteristica_habitacion').delete().eq('habitacionid', id).eq('caracteristicaid', caracteristicaid);
  console.log(error);
  if (error) {
    await Swal.fire('Error al eliminar la caracteristica', error.message, 'error');
    return false;
  }
  return true;
};

const actualizacionDeCaracteristicas = async (id: string, caracteristica_habitacion: string[]) => {
  const { data: caracteristicas } = await supabase.from('caracteristica_habitacion').select('*').eq('habitacionid', id);

  for (const nuevo of caracteristica_habitacion) {
    let bandera = false;
    const arregloAux = [];

    if (!caracteristicas) return;

    for (const elem of caracteristicas) {
      if (elem.caracteristicaid === nuevo) {
        bandera = true;
        break;
      }
      arregloAux.push(elem.caracteristicaid);
    }

    if (!bandera) {
      const { error } = await supabase.from('caracteristica_habitacion').insert({ habitacionid: id, caracteristicaid: nuevo });
      if (error) {
        await Swal.fire('Error al cargar la habitacion', error.message, 'error');
        return false;
      }
    }
  }
};
