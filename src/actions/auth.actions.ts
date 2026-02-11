//Iniciar Sesion

import Swal from 'sweetalert2';
import { supabase } from '../lib/supababase';
import type { Usuario } from '../interface';

export const loginSupabase = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.message === 'Invalid login credentials') {
      return {
        ok: false,
        msg: 'Credenciales Invalidas',
        token: '',
      };
    }

    // Verificar si el usuario está activo
    const { data: usuarioData, error: usuarioError } = await supabase.from('usuarios').select('estado').eq('id', data.user?.id).single();

    if (usuarioError) {
      // Si hay error al leer el usuario (ej. RLS o no existe), por seguridad cerramos sesión
      await supabase.auth.signOut();
      return {
        ok: false,
        msg: 'Error verificando estado del usuario',
        token: '',
      };
    }

    if (usuarioData?.estado === false) {
      await supabase.auth.signOut();
      return {
        ok: false,
        msg: 'Usuario desactivado. Contacte al administrador.',
        token: '',
      };
    }

    return {
      msg: '',
      token: data.session?.access_token as string,
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: 'Error al iniciar sesion',
      token: '',
      ok: false,
    };
  }
};

export const getRolUser = async (): Promise<Usuario | false> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    await Swal.fire('Error al obtener el rol del usuario', error.message, 'error');
    return false;
  }

  const { data: user, error: errorRol } = await supabase.from('usuarios').select().eq('id', data.user.id).single<Usuario>();
  if (errorRol) {
    await Swal.fire('Error al obtener el rol del usuario', errorRol.message, 'error');
    return false;
  }

  return user;
};

export const recoveryPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/actualizar-contraseña',
    });
    if (error) {
      console.error(error);
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePassword = async (password: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) {
      console.error(error.message);
      if (error.message === 'New password should be different from the old password.') {
        return {
          ok: false,
          msg: 'La contraseña debe ser diferente a la anterior',
          token: '',
        };
      }
      return {
        ok: false,
        msg: 'Error al actualizar la contraseña',
        token: '',
      };
    }

    return {
      ok: true,
      msg: 'Contraseña actualizada correctamente',
      token: '',
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      msg: 'Error al actualizar la contraseña',
      token: '',
    };
  }
};

export const verificarRol = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    const { data: user } = await supabase.from('usuarios').select().eq('id', data.user.id).single();
    return user.rol;
  }

  if (error) {
    return null;
  }
};
