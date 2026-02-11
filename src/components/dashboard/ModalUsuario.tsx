import { useState } from 'react';

import { useForm } from '../../hooks/useForm';
import type { Usuario } from '../../interface/Usuario';
import { useUsuarioStore } from '../../store/usuario.store';
import { IoClose } from 'react-icons/io5';
import { useMutateUser } from '../../hooks/user/useMutateUser';

const initialState: Usuario = {
  email: '',
  password: '',
  rol: 'empleado',
  created_at: new Date().toISOString(),
};

export const ModalUsuario = () => {
  const { closeModal } = useUsuarioStore();
  const { email, password, rol, onInputChange, onResetForm, formState } = useForm(initialState);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createUserMutation } = useMutateUser();

  const handleCancel = () => {
    onResetForm();
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === '') return setError(true);
    if (password === '') return setError(true);

    setIsLoading(true);
    try {
      const res = await createUserMutation.mutateAsync(formState);
      if (res) {
        onResetForm();
        closeModal();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-all duration-300">
      <div className="bg-[#FDFCFB] dark:bg-[#1E1B18] rounded-xl shadow-2xl w-full max-w-2xl mx-4 transform transition-all p-8 relative border border-[#F5F0E1] dark:border-[#B59E6B]/20 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleCancel}
          className="absolute right-6 top-6 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#2D2926] dark:hover:text-[#FDFCFB] transition-colors p-1 rounded-full hover:bg-[#F5F0E1] dark:hover:bg-[#B59E6B]/10"
        >
          <IoClose size={24} />
        </button>

        <div className="mb-8">
          <h3 className="text-2xl font-serif text-[#2D2926] dark:text-[#FDFCFB] mb-2">Nuevo Usuario</h3>
          <p className="text-[#2D2926]/60 dark:text-[#FDFCFB]/60 text-sm">Ingresa los datos para registrar un nuevo miembro del equipo.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2D2926]/80 dark:text-[#FDFCFB]/80 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={onInputChange}
                className={`w-full bg-[#F9F7F2] dark:bg-[#2D2926] border ${error && email === '' ? 'border-red-400' : 'border-[#E5E0D5] dark:border-[#B59E6B]/20'} rounded-lg px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] placeholder-[#2D2926]/30 dark:placeholder-[#FDFCFB]/30 focus:outline-none focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B]/20 transition-all`}
                placeholder="usuario@hotel.com"
                name="email"
                id="email"
              />
              {error && email === '' && <p className="text-red-500 text-xs mt-1 ml-1">El email es obligatorio</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2D2926]/80 dark:text-[#FDFCFB]/80 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={onInputChange}
                className={`w-full bg-[#F9F7F2] dark:bg-[#2D2926] border ${error && password === '' ? 'border-red-400' : 'border-[#E5E0D5] dark:border-[#B59E6B]/20'} rounded-lg px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] placeholder-[#2D2926]/30 dark:placeholder-[#FDFCFB]/30 focus:outline-none focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B]/20 transition-all`}
                placeholder="••••••••"
                name="password"
                id="password"
              />
              {error && password === '' && <p className="text-red-500 text-xs mt-1 ml-1">La contraseña es obligatoria</p>}
            </div>

            <div>
              <label htmlFor="rol" className="block text-sm font-medium text-[#2D2926]/80 dark:text-[#FDFCFB]/80 mb-2">
                Rol de Usuario
              </label>
              <div className="relative">
                <select
                  className="w-full bg-[#F9F7F2] dark:bg-[#2D2926] border border-[#E5E0D5] dark:border-[#B59E6B]/20 rounded-lg px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:outline-none focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B]/20 transition-all appearance-none cursor-pointer"
                  name="rol"
                  id="rol"
                  value={rol}
                  onChange={onInputChange}
                >
                  <option value="admin">Administrador</option>
                  <option value="empleado">Empleado</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#2D2926]/50 dark:text-[#FDFCFB]/50">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#F5F0E1] dark:border-[#B59E6B]/20 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg text-[#2D2926]/70 dark:text-[#FDFCFB]/70 hover:bg-[#F5F0E1] dark:hover:bg-[#B59E6B]/10 hover:text-[#2D2926] dark:hover:text-[#FDFCFB] transition-colors font-medium disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-lg bg-[#B59E6B] text-white hover:bg-[#A38D5D] shadow-md hover:shadow-lg transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creando...</span>
                </>
              ) : (
                <span>Crear Usuario</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
