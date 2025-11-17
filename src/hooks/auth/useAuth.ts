import Cookies from 'js-cookie'
import { loginSupabase } from '../../actions/auth.actions';

//Este hook lo que hace es dar la opcion de loguear o cerrar sesion, y devolver tambien un boolean para saber si esta logueado o no

export const useAuth = () => {
    const session = Cookies.get('session');

    const login = async (email: string, password: string) => {
        const token = await loginSupabase(email, password);

        if (token) {
            Cookies.set('session', token, { expires: 1 });
            return { ok: true }
        } else {
            return { ok: false }
        }
    };

    const logout = () => {
        Cookies.remove('session')
    };


    const estaAutenticado = !!session;

    return {
        //Atributo
        estaAutenticado,

        //Metodos
        login,
        logout
    }
}