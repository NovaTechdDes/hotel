import axios from 'axios';
import { supabase } from '../lib/supababase';
import Swal from 'sweetalert2';
import { mensaje } from '../helpers/mensaje';

/**
 * Obtiene la lista de usuarios registrados desde la Edge Function de Supabase.
 * Esta función requiere que el usuario actual tenga una sesión válida.
 *
 * @returns {Promise<any[] | undefined>} Una promesa que resuelve a la lista de usuarios o undefined si no hay sesión.
 */
export const obtenerUsuarios = async () => {
  try {
    // Obtenemos la sesión actual para el token de autorización
    console.log('a');
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Si no hay sesión, no podemos realizar la petición
    if (!session) return;

    // Llamada a la Edge Function 'users-list' que procesa la lógica de admin
    const { data } = await axios(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/users-list`, {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    return data;
  } catch (error: any) {
    console.error('Error al obtener usuarios:', error.response?.data || error.message);
  }
};

export const createUser = async (email: string, password: string = '', rol: string): Promise<boolean> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      await Swal.fire('Error', 'No hay sesión activa', 'error');
      return false;
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/users-list`,
      { email, password, rol },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Usuario creado:', data);

    mensaje('Usuario creado correctamente', 'success');

    return true;
  } catch (error: any) {
    console.error('Error creando usuario:', error);
    await Swal.fire('Error al crear usuario', error.response?.data?.error || error.message, 'error');
    return false;
  }
};

export const updateUserStatus = async (id: string, estado: boolean): Promise<boolean> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      await Swal.fire('Error', 'No hay sesión activa', 'error');
      return false;
    }

    const { data } = await axios.patch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/users-list`,
      { id, estado },
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Usuario actualizado:', data);

    mensaje('Estado de usuario actualizado', 'success');
    return true;
  } catch (error: any) {
    console.error('Error actualizando usuario:', error.response);
    await Swal.fire('Error al actualizar usuario', error.response?.data?.error || error.message, 'error');
    return false;
  }
};
