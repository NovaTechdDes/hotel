


//Iniciar Sesion

import Swal from "sweetalert2";
import { supabase } from "../lib/supababase"
import type { Usuario } from "../interface";

export const loginSupabase = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (!error) {
            return data.session.access_token
        }
    } catch (error) {
        console.log(error)
    }


};

export const getRolUser = async (): Promise<Usuario | false> => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        await Swal.fire('Error al obtener el rol del usuario', error.message, 'error');
        return false;
    };

    const { data: user, error: errorRol } = await supabase.from('usuarios').select().eq('id', data.user.id).single();

    if (errorRol) {
        await Swal.fire('Error al obtener el rol del usuario', errorRol.message, 'error');
        return false;
    };

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
        };

        const { user } = data;
        const { data: usuario, error: errorUsuario } = await supabase.from('usuarios').insert({ id: user?.id, rol }).select().single();

        if (errorUsuario) {
            await Swal.fire('Error al cargar el rol del usuario', errorUsuario.message, 'error');
            return false;
        };
        console.log(usuario);
        return true;

    } catch (error) {
        console.log(error);
        return false
    }

};