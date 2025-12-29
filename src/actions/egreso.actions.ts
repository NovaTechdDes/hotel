import Swal, { type SweetAlertResult } from 'sweetalert2';
import { supabase } from '../lib/supababase';
import type { Egreso } from '../interface/Egreso';

interface TipoImporte {
  importe: number;
  descripcion: string;
}

export const getEgresos = async (): Promise<Egreso[]> => {
  const { data, error } = await supabase.from('egreso').select('*, tipoEgreso(id, descripcion)');

  if (error) await Swal.fire('Error al obtener los egresos', error.message, 'error');
  return data as Egreso[];
};

export const getEgresoPorTipo = async (): Promise<TipoImporte[] | []> => {
  const { data, error } = await supabase.rpc('egreso_por_tipo');

  if (error) await Swal.fire('Error al obtener los tipos con sus importes', error.message, 'error');

  return data ?? [];
};

export const getTotalEgresos = async (): Promise<number> => {
  const { data, error } = await supabase.rpc('total_egreso');

  if (error) await Swal.fire('Error al obtener el total de los egresos', error.message, 'error');

  return data ?? 0;
};

export const getEgresoById = async (id: number): Promise<Egreso | null> => {
  const { data, error } = await supabase.from('egreso').select('*').eq('id', id).single();

  if (error) throw new Error(error.message);

  return data as Egreso;
};

export const postEgreso = async (egreso: Omit<Egreso, 'id' | 'creado_en'>): Promise<Egreso | SweetAlertResult<any>> => {
  // Obtener el usuario autenticado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    await Swal.fire('Error', 'No se pudo obtener el usuario autenticado', 'error');
    throw new Error('No se pudo obtener el usuario autenticado');
  }

  // Guardar el usuarioId en el egreso
  const egresoWithUser = { ...egreso, usuarioid: user.id };
  console.log(egresoWithUser);
  try {
    const { data, error } = await supabase.from('egreso').insert(egresoWithUser).select().single();
    if (error) return await Swal.fire('Error al cargar egreso', error.message, 'error');
    return data;
  } catch (error) {
    console.error(error);
    return await Swal.fire('Error al cargar egreso', 'error', 'error');
  }
};

export const updateEgreso = async (id: number | undefined, updates: Partial<Egreso>): Promise<Egreso | SweetAlertResult<any>> => {
  const { tipoEgreso, ...egreso } = updates;

  const { data, error } = await supabase.from('egreso').update(egreso).eq('id', id).select().single();

  if (error) return await Swal.fire('Error al modificar egreso', error.message, 'error');

  return data;
};

export const deleteEgreso = async (id: number): Promise<boolean | SweetAlertResult<any>> => {
  try {
    const { data, error } = await supabase.from('egreso').delete().eq('id', id);
    if (error) return await Swal.fire('Error al eliminar egreso', error.message, 'error');
    console.log(data);
    return true;
  } catch (error) {
    console.error(error);
    return await Swal.fire('Error al eliminar egreso', 'error', 'error');
  }
};
