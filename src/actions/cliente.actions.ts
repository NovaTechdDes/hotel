import Swal, { type SweetAlertResult } from 'sweetalert2';
import type { Cliente } from '../interface/Cliente';
import { supabase } from '../lib/supababase';

export const getclientes = async (): Promise<Cliente[]> => {
  const { data, error } = await supabase.from('cliente').select('*').order('nombre', { ascending: true });

  if (error) throw new Error(error.message);
  return data as Cliente[];
};

export const getClienteById = async (id: number): Promise<Cliente | null> => {
  const { data, error } = await supabase.from('cliente').select('*').eq('id', id).single();

  if (error) throw new Error(error.message);

  return data as Cliente;
};

export const postCliente = async (cliente: Omit<Cliente, 'id' | 'creado_en'>): Promise<Cliente | SweetAlertResult<any>> => {
  try {
    const { data, error } = await supabase.from('cliente').insert(cliente).select().single();
    if (error) return await Swal.fire('Error al cargar cliente', error.message, 'error');
    return data;
  } catch (error) {
    console.error(error);
    return await Swal.fire('Error al cargar cliente', 'error', 'error');
  }
};

export const updateCliente = async (id: string | undefined, updates: Partial<Cliente>): Promise<Cliente | SweetAlertResult<any>> => {
  const { data, error } = await supabase.from('cliente').update(updates).eq('id', id).select().single();

  if (error) return await Swal.fire('Error al modificar el cliente', error.message, 'error');

  return data;
};

export const deleteCliente = async (id: string): Promise<boolean | SweetAlertResult<any>> => {
  try {
    const { error } = await supabase.from('cliente').delete().eq('id', id);
    if (error) return await Swal.fire('Error al eliminar el cliente', error.message, 'error');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
