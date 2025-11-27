import Swal, { type SweetAlertResult } from 'sweetalert2';
import { supabase } from '../lib/supababase';
import type { TipoEgreso } from '../interface/TipoEgreso';
import { verError } from '../helpers/verError';

export const getTipoEgresos = async (): Promise<TipoEgreso[]> => {
  const { data, error } = await supabase.from('tipoEgreso').select('*');

  if (error) await Swal.fire('Error la obtener los Tipo de Egresos', error.message, 'error');
  return data as TipoEgreso[];
};

export const getTipoEgresoById = async (id: number): Promise<TipoEgreso | null> => {
  const { data, error } = await supabase.from('tipoEgreso').select('*').eq('id', id).single();

  if (error) throw new Error(error.message);

  return data as TipoEgreso;
};

export const postTipoEgreso = async (tipoEgreso: Omit<TipoEgreso, 'id' | 'creado_en'>): Promise<TipoEgreso | SweetAlertResult<any>> => {
  try {
    const { data, error } = await supabase.from('tipoEgreso').insert(tipoEgreso).select().single();
    if (error) return await Swal.fire('Error al cargar tipo de egreso', error.message, 'error');
    return data;
  } catch (error) {
    console.log(error);
    return await Swal.fire('Error al cargar tipo de egreso', 'error', 'error');
  }
};

export const updateTipoEgreso = async (id: number, updates: Partial<TipoEgreso>): Promise<TipoEgreso | SweetAlertResult<any>> => {
  const { data, error } = await supabase.from('tipoEgreso').update(updates).eq('id', id).select().single();

  if (error) return await Swal.fire('Error al modificar tipo de egreso', error.message, 'error');

  return data;
};

export const deleteTipoEgreso = async (id: number): Promise<boolean | SweetAlertResult<any>> => {
  try {
    const { error } = await supabase.from('tipoEgreso').delete().eq('id', id);

    if (!verError(error?.code)) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
