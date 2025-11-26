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
      await Swal.fire('Error al iniciar sesion', 'credenciales invalidas', 'error');
      return {
        ok: false,
        msg: 'Credenciales Invalidas',
        token: '',
      };
    }

    return {
      msg: '',
      token: data.session?.access_token as string,
      ok: true,
    };
  } catch (error) {
    console.log(error);
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

  const { data: user, error: errorRol } = await supabase.from('usuarios').select().eq('id', data.user.id).single();

  if (errorRol) {
    await Swal.fire('Error al obtener el rol del usuario', errorRol.message, 'error');
    return false;
  }

  return user;
};

export const createUser = async (email: string, password: string = '', rol: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      await Swal.fire('Error al cargar el ususario', error.message, 'error');
      return false;
    }

    const { user } = data;
    const { data: usuario, error: errorUsuario } = await supabase.from('usuarios').insert({ id: user?.id, rol }).select().single();

    if (errorUsuario) {
      await Swal.fire('Error al cargar el rol del usuario', errorUsuario.message, 'error');
      return false;
    }
    console.log(usuario);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const recoveryPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/actualizar-contraseña',
    });
    if (error) {
      console.log(error);
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updatePassword = async (password: string) => {
  try {
    console.log(password);
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) {
      console.log(error.message);
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
    console.log(error);
    return {
      ok: false,
      msg: 'Error al actualizar la contraseña',
      token: '',
    };
  }
};
