import Swal, { type SweetAlertResult } from 'sweetalert2';
import type { Precio } from '../interface/Precio';
import { supabase } from '../lib/supababase';

export const getPrecio = async (): Promise<Precio | undefined> => {
  const { data, error } = await supabase.from('precio').select('*');

  if (error || !data) await Swal.fire('Error al obtener el Precio', error.message, 'error');

  if (data) {
    return data[0] as Precio;
  }
};

export const updatePrecio = async (precio: Partial<Precio>): Promise<Precio | SweetAlertResult | boolean> => {
  const { data, error } = await supabase.from('precio').update(precio).eq('id', precio.id);

  if (error) return await Swal.fire('No se pudo modificar el precio', error?.message, 'error');

  if (data) {
    return data[0] as Precio;
  } else {
    return true;
  }
};
