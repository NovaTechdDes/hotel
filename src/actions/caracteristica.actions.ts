import Swal from 'sweetalert2';
import type { Caracteristica } from '../interface';
import { supabase } from '../lib/supababase';

export const getCaracteristicas = async (): Promise<Caracteristica[]> => {
  try {
    const { data, error } = await supabase.from('caracteristica').select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const postCaracteristica = async (caracteristica: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('caracteristica').insert({
      nombre: caracteristica,
    });
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.log(error);
    await Swal.fire('Error al cargar caracteristica', error.message, 'error');
    return false;
  }
};

export const updateCaracteristica = async (updates: Partial<Caracteristica>): Promise<boolean> => {
  try {
    const { error } = await supabase.from('caracteristica').update(updates).eq('id', updates.id);
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.log(error);
    await Swal.fire('Error al modificar caracteristica', error.message, 'error');
    return false;
  }
};

export const deleteCaracteristica = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('caracteristica').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error: any) {
    console.log(error);
    await Swal.fire('Error al eliminar caracteristica', error.message, 'error');
    return false;
  }
};
